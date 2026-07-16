'use client';

import { useEffect, useRef } from 'react';

/*
  The living ASCII scene, in the gabsalvo.com/domoroshi.tech idiom: spawn an
  element, send it across on a linear transform transition, bin it on
  transitionend. What drifts here is MCP traffic — requests head out to the
  server, responses come back — and the periscope watches it go by.
*/

const rand = (min: number, max: number) => Math.random() * (max - min) + min;
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];

/**
 * Deals from a shuffled deck, reshuffling only once it runs out, so the same
 * method never sits on screen twice — repeats read as a rendering bug.
 */
function dealer<T>(items: readonly T[]): () => T {
  let deck: T[] = [];
  return () => {
    if (!deck.length) {
      deck = [...items];
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
    return deck.pop()!;
  };
}

const BIRDS = ['v', '^', '—v—', '—^—', '~~v~~', '~~^~~'] as const;
const FLAP: Record<string, string> = {
  'v': '^', '^': 'v',
  '—v—': '—^—', '—^—': '—v—',
  '~~v~~': '~~^~~', '~~^~~': '~~v~~',
};

const REQUESTS = [
  '▸ initialize', '▸ tools/list', '▸ tools/call',
  '▸ resources/list', '▸ resources/read', '▸ prompts/get',
] as const;
const RESPONSES = [
  '◂ 200 · 8ms', '◂ 200 · 24ms', '◂ 200 · 96ms',
  '◂ 200 · 412ms', '◂ 200 · ~1.2k', '◂ 200 · ~5.3k',
] as const;
const ERRORS = ['◂ 500 · error', '◂ 404 · error'] as const;
const RIPPLES = ['~', '~ ~', '~~', ' ~ '] as const;

type Stop = () => void;

/** Send `el` across `host`; returns its cleanup fn. */
function launch(
  host: HTMLElement,
  el: HTMLElement,
  opts: { rtl: boolean; dur: number; pad: number; seeded: boolean; onDone?: () => void },
): Stop {
  const width = host.getBoundingClientRect().width;
  const { rtl, pad, seeded } = opts;

  let startX = rtl ? width + pad : -pad;
  const endX = rtl ? -pad : width + pad;
  let dur = opts.dur;

  // Seeded spawns start mid-flight so the scene is already alive on first paint
  if (seeded) {
    startX = rand(-pad, width + pad);
    dur *= Math.abs(endX - startX) / (width + pad * 2);
  }

  el.style.transform = `translateX(${startX}px)`;
  el.style.transition = `transform ${dur}s linear`;
  host.appendChild(el);

  const cleanup = () => {
    el.removeEventListener('transitionend', cleanup);
    el.remove();
    opts.onDone?.();
  };
  el.addEventListener('transitionend', cleanup);

  requestAnimationFrame(() => requestAnimationFrame(() => {
    el.style.transform = `translateX(${endX}px)`;
  }));

  return cleanup;
}

/**
 * Runs `run` while the tab is visible and motion is welcome, tearing the scene
 * down on hide / reduced-motion and rebuilding it on return.
 */
function useScene(run: (host: HTMLElement) => Stop) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop: Stop | null = null;

    const sync = () => {
      const welcome = document.visibilityState === 'visible' && !reduce.matches;
      if (welcome && !stop) stop = run(host);
      else if (!welcome && stop) { stop(); stop = null; }
    };

    sync();
    document.addEventListener('visibilitychange', sync);
    reduce.addEventListener('change', sync);
    return () => {
      document.removeEventListener('visibilitychange', sync);
      reduce.removeEventListener('change', sync);
      stop?.();
    };
  }, [run]);

  return ref;
}

/** Timer + node bookkeeping shared by both scenes. */
function bookkeeper() {
  const timers = new Set<ReturnType<typeof setTimeout>>();
  const intervals = new Set<ReturnType<typeof setInterval>>();
  const nodes = new Set<Stop>();

  return {
    nodes,
    every(fn: () => void, min: number, max: number) {
      const schedule = () => {
        const t = setTimeout(() => { timers.delete(t); fn(); schedule(); }, rand(min, max));
        timers.add(t);
      };
      schedule();
    },
    after(fn: () => void, ms: number) {
      const t = setTimeout(() => { timers.delete(t); fn(); }, ms);
      timers.add(t);
      return t;
    },
    interval(fn: () => void, ms: number) {
      const i = setInterval(fn, ms);
      intervals.add(i);
      return i;
    },
    clearInterval(i: ReturnType<typeof setInterval>) {
      clearInterval(i);
      intervals.delete(i);
    },
    stop() {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      nodes.forEach((fn) => fn());
      timers.clear(); intervals.clear(); nodes.clear();
    },
  };
}

/* ── sky: birds drifting over the sunset ──────────────────────────────── */

function runSky(host: HTMLElement): Stop {
  const book = bookkeeper();

  const spawnBird = (seeded: boolean) => {
    if (host.getBoundingClientRect().width <= 0) return;

    const el = document.createElement('span');
    el.className = 'drift';
    el.style.top = `${rand(8, 78)}%`;

    const wings = pick(BIRDS);
    el.textContent = wings;
    const flap = book.interval(() => {
      el.textContent = el.textContent === wings ? FLAP[wings] : wings;
    }, Math.floor(rand(220, 320)));

    const cleanup = launch(host, el, {
      rtl: Math.random() < 0.5,
      dur: rand(25, 45),
      pad: 120,
      seeded,
      onDone: () => { book.clearInterval(flap); book.nodes.delete(cleanup); },
    });
    book.nodes.add(cleanup);
  };

  for (let i = 0; i < 6; i++) spawnBird(true);
  book.every(() => spawnBird(false), 2000, 6000);

  return book.stop;
}

/* ── ocean: MCP traffic drifting past the periscope ───────────────────── */

const MAX_PACKETS = 11;

function runOcean(host: HTMLElement): Stop {
  const book = bookkeeper();
  let live = 0;

  const dealRequest = dealer(REQUESTS);
  const dealResponse = dealer(RESPONSES);

  const spawnPacket = (seeded: boolean) => {
    if (live >= MAX_PACKETS) return;
    if (host.getBoundingClientRect().width <= 0) return;

    const isReq = Math.random() < 0.5;
    const isErr = !isReq && Math.random() < 0.15;

    const el = document.createElement('span');
    el.className = `packet${isErr ? ' err' : ''}`;
    el.textContent = isErr ? pick(ERRORS) : isReq ? dealRequest() : dealResponse();
    el.style.top = `${rand(6, 92)}%`;

    live++;
    const cleanup = launch(host, el, {
      // requests head out to the server, responses drift back
      rtl: !isReq,
      dur: rand(28, 52),
      pad: 160,
      seeded,
      onDone: () => { live--; book.nodes.delete(cleanup); },
    });
    book.nodes.add(cleanup);
  };

  const spawnRipple = () => {
    if (host.getBoundingClientRect().width <= 0) return;

    const el = document.createElement('span');
    el.className = 'ripple';
    el.textContent = pick(RIPPLES);
    el.style.left = `${rand(4, 92)}%`;
    el.style.top = `${rand(8, 88)}%`;
    host.appendChild(el);
    book.nodes.add(() => el.remove());

    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('show')));
    book.after(() => {
      el.classList.remove('show');
      book.after(() => el.remove(), 4000);
    }, rand(2200, 4500));
  };

  for (let i = 0; i < 7; i++) spawnPacket(true);
  for (let i = 0; i < 3; i++) spawnRipple();
  book.every(() => spawnPacket(false), 2600, 6000);
  book.every(spawnRipple, 2500, 6000);

  return book.stop;
}

/* ── components ───────────────────────────────────────────────────────── */

export function Sky({ children }: { children?: React.ReactNode }) {
  const ref = useScene(runSky);
  return (
    <div ref={ref} className="sky-band relative w-full h-14 overflow-hidden" aria-hidden="true">
      {children}
    </div>
  );
}

export function Ocean() {
  const ref = useScene(runOcean);
  return <div ref={ref} className="ocean-layer hidden md:block" aria-hidden="true" />;
}
