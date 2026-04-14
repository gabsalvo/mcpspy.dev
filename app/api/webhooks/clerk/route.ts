import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { clerkClient } from '@clerk/nextjs/server';

// Clerk sends webhook events signed with CLERK_WEBHOOK_SECRET (set in Clerk Dashboard → Webhooks)
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

interface ClerkSubscriptionEvent {
  type: string;
  data: {
    id?: string;
    user_id?: string;
    status?: string;
    plan_slug?: string;
    public_metadata?: Record<string, unknown>;
  };
}

export async function POST(req: Request) {
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);
  let event: ClerkSubscriptionEvent;

  try {
    event = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkSubscriptionEvent;
  } catch (err: unknown) {
    const error = err as Error;
    console.error('Clerk webhook verification failed:', error.message);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const { type, data } = event;
  console.log(`Clerk webhook received: ${type}`);

  // Handle subscription activation — Clerk fires this when a user subscribes via PricingTable
  if (type === 'subscription.activated' || type === 'subscription.created') {
    const userId = data.user_id;
    if (userId) {
      try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { plan: 'pro' },
        });
        console.log(`User ${userId} upgraded to PRO via Clerk subscription webhook`);
      } catch (err) {
        console.error('Failed to update user metadata:', err);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }
    }
  }

  // Handle subscription cancellation / expiry
  if (type === 'subscription.deactivated' || type === 'subscription.deleted') {
    const userId = data.user_id;
    if (userId) {
      try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(userId, {
          publicMetadata: { plan: 'free' },
        });
        console.log(`User ${userId} downgraded to free via Clerk subscription webhook`);
      } catch (err) {
        console.error('Failed to update user metadata:', err);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
