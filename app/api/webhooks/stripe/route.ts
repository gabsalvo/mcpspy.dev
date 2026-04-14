import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { clerkClient } from '@clerk/nextjs/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-03-25.dahlia', // Or whatever version you have
});

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: unknown) {
    const error = err as Error;
    console.error(`Webhook signature verification failed. ${error.message}`);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Grab the Clerk user ID you passed to the Checkout session
    // Usually you pass this via `client_reference_id` when creating the link from Stripe dashboard or API
    const clerkUserId = session.client_reference_id || session.metadata?.clerkUserId;

    if (clerkUserId) {
      try {
        const client = await clerkClient();
        await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            plan: 'pro',
            stripeCustomerId: session.customer as string,
          }
        });
        console.log(`Successfully upgraded user ${clerkUserId} to PRO`);
      } catch (error) {
        console.error('Error updating Clerk user:', error);
        return NextResponse.json({ error: 'Error updating Clerk user' }, { status: 500 });
      }
    } else {
      console.warn('No clerkUserId found on session. Provide client_reference_id when generating Stripe links.');
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
