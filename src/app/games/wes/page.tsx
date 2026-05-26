'use client';
import './page.scss';

import { IoMdArrowBack } from '@react-icons/all-files/io/IoMdArrowBack';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ITEMS, QuizItem } from './items';

const COUNTDOWN_SECONDS = 10;
const SWIPE_THRESHOLD = 72;
const AUTO_ADVANCE_SECONDS = 3;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playPop() {
  try {
    const Ctx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    // Body: quick descending sine "boop"
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.18);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.6, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);

    // Sparkle: tiny high blip on top
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now);
    osc2.frequency.exponentialRampToValueAtTime(2640, now + 0.08);
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.25, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.15);

    setTimeout(() => ctx.close(), 400);
  } catch {
    // sound is non-essential
  }
}

type Phase = 'counting' | 'paused' | 'revealed';

function fuzzyMatch(query: string, name: string): boolean {
  const q = query.toLowerCase();
  const n = name.toLowerCase();
  let qi = 0;
  for (let i = 0; i < n.length && qi < q.length; i++) {
    if (n[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function WesQuiz() {
  const [deck, setDeck] = useState<QuizItem[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setDeck(shuffle(ITEMS));
  }, []);

  const searchResults = search ? ITEMS.filter((item) => fuzzyMatch(search, item.name)) : [];
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('counting');
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [autoAdvanceRemaining, setAutoAdvanceRemaining] = useState<number | null>(null);

  // Swipe state
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeOut, setSwipeOut] = useState<'left' | 'right' | null>(null);
  const [enterDir, setEnterDir] = useState<'left' | 'right' | null>(null);
  const historyRef = useRef<number[]>([]);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const cardRef = useRef<HTMLButtonElement>(null);

  const current = deck[idx];

  const clearTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const reveal = useCallback(() => {
    clearTick();
    setPhase('revealed');
    playPop();
  }, [clearTick]);

  // Run countdown
  useEffect(() => {
    if (phase !== 'counting') return;
    tickRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearTick();
          setPhase('revealed');
          setAutoAdvanceRemaining(AUTO_ADVANCE_SECONDS);
          playPop();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return clearTick;
  }, [phase, clearTick]);

  const jumpTo = useCallback((item: QuizItem) => {
    const rest = ITEMS.filter((i) => i !== item);
    setDeck([item, ...shuffle(rest)]);
    setIdx(0);
    setPhase('counting');
    setRemaining(COUNTDOWN_SECONDS);
    setSearch('');
    historyRef.current = [];
    clearTick();
  }, [clearTick]);

  const next = useCallback(() => {
    setAutoAdvanceRemaining(null);
    const nextIdx = idx + 1;
    if (nextIdx >= deck.length) {
      setDeck(shuffle(ITEMS));
      setIdx(0);
    } else {
      setIdx(nextIdx);
    }
    setRemaining(COUNTDOWN_SECONDS);
    setPhase('counting');
  }, [idx, deck.length]);

  const prev = useCallback(() => {
    setAutoAdvanceRemaining(null);
    const h = historyRef.current;
    if (h.length === 0) return;
    const prevIdx = h[h.length - 1];
    historyRef.current = h.slice(0, -1);
    setIdx(prevIdx);
    setRemaining(COUNTDOWN_SECONDS);
    setPhase('counting');
  }, []);

  // Auto-advance after auto-reveal
  useEffect(() => {
    if (autoAdvanceRemaining === null) return;
    if (autoAdvanceRemaining === 0) {
      next();
      return;
    }
    const t = setTimeout(() => setAutoAdvanceRemaining((r) => r! - 1), 1000);
    return () => clearTimeout(t);
  }, [autoAdvanceRemaining, next]);

  // Non-passive touchmove to allow preventDefault for horizontal swipes
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      if (touchStartXRef.current === null || touchStartYRef.current === null) return;
      const dx = e.touches[0].clientX - touchStartXRef.current;
      const dy = e.touches[0].clientY - touchStartYRef.current;
      if (Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault();
      }
      setDragX(dx);
      setIsDragging(true);
    };
    el.addEventListener('touchmove', onMove, { passive: false });
    return () => el.removeEventListener('touchmove', onMove);
  }, [!!current]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    if (Math.abs(dragX) < SWIPE_THRESHOLD) {
      setDragX(0);
      return;
    }

    const dir = dragX < 0 ? 'left' : 'right';

    if (dir === 'left' && historyRef.current.length === 0) {
      setDragX(0);
      return;
    }

    const capturedIdx = idx;
    setSwipeOut(dir);
    setTimeout(() => {
      setDragX(0);
      setSwipeOut(null);
      if (dir === 'right') {
        setEnterDir('left');
        historyRef.current = [...historyRef.current, capturedIdx];
        next();
      } else {
        setEnterDir('right');
        prev();
      }
    }, 380);
  }, [dragX, idx, next, prev]);

  const handleImageTap = () => {
    if (phase === 'counting') {
      clearTick();
      setPhase('paused');
    } else if (phase === 'paused') {
      setPhase('counting');
    } else {
      next();
    }
  };

  const progress = useMemo(() => ((COUNTDOWN_SECONDS - remaining) / COUNTDOWN_SECONDS) * 100, [remaining]);

  const nextItem = deck[(idx + 1) % deck.length];

  if (!current) {
    if (ITEMS.length === 0) {
      return (
        <div className="wes">
          <p>
            No items configured yet. Add some to <code>src/app/games/wes/items.ts</code>.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="wes">
      <div className="wes__header">
        <Link href="/" aria-label="Back home">
          <IoMdArrowBack size="2em" />
        </Link>
        <h1>What is it?</h1>
        <div className="wes__spacer" />
      </div>

      <div className="wes__search">
        <input
          type="search"
          placeholder="Jump to..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search for a character"
        />
        {searchResults.length > 0 && (
          <ul className="wes__search-results">
            {searchResults.map((item) => (
              <li key={item.name}>
                <button type="button" onClick={() => jumpTo(item)}>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="wes__stage">
        <button
          ref={cardRef}
          type="button"
          className={`image-card phase-${phase}${swipeOut ? ` swipe-out-${swipeOut}` : ''}${enterDir ? ` card-enter-from-${enterDir}` : ''}`}
          onClick={handleImageTap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onAnimationEnd={(e) => {
            if (e.animationName === 'enterFromLeft' || e.animationName === 'enterFromRight') {
              setEnterDir(null);
            }
          }}
          aria-label={phase === 'revealed' ? 'Next' : phase === 'counting' ? 'Pause timer' : 'Resume timer'}
          style={{
            transform: enterDir
              ? undefined
              : swipeOut
              ? swipeOut === 'left'
                ? 'translateX(-140vw) rotate(-28deg)'
                : 'translateX(140vw) rotate(28deg)'
              : `translateX(${dragX}px) rotate(${dragX * 0.05}deg)`,
            transition: enterDir
              ? undefined
              : swipeOut
              ? 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : isDragging
              ? 'none'
              : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.url} alt="Guess what this is" draggable={false} />
          {isDragging && dragX < -20 && historyRef.current.length > 0 && (
            <div className="swipe-hint swipe-hint--back">← Back</div>
          )}
          {isDragging && dragX > 20 && (
            <div className="swipe-hint swipe-hint--next">Next →</div>
          )}
          {phase === 'revealed' && (
            <div className="reveal-overlay" aria-live="polite">
              <span className="reveal-text">{current.name}</span>
            </div>
          )}
        </button>

        <div className="timer" aria-hidden={phase === 'revealed'}>
          {phase !== 'revealed' && (
            <>
              <div className="timer-ring">
                <div className="timer-fill" style={{ width: `${progress}%`, transition: progress === 0 ? 'none' : undefined }} />
              </div>
              <div className={`timer-num ${phase === 'paused' ? 'paused' : ''}`}>
                {phase === 'paused' ? '⏸' : remaining}
              </div>
            </>
          )}
        </div>

        <div className="controls">
          {phase === 'revealed' ? (
            <button
              className={`btn primary${autoAdvanceRemaining !== null ? ' auto-advancing' : ''}`}
              onClick={next}
            >
              {autoAdvanceRemaining !== null ? `Next → ${autoAdvanceRemaining}` : 'Next →'}
              {autoAdvanceRemaining !== null && <span className="btn-drain" />}
            </button>
          ) : (
            <button className="btn ghost" onClick={reveal}>
              Reveal now
            </button>
          )}
        </div>

        <p className="hint">
          {phase === 'counting' && 'Tap to pause · swipe right for next · swipe left to go back.'}
          {phase === 'paused' && 'Paused — tap the picture to resume.'}
          {phase === 'revealed' && 'Tap or swipe right for next · swipe left to go back!'}
        </p>

        {/* Preload next image while current card is displayed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {nextItem && <img src={nextItem.url} alt="" aria-hidden fetchPriority="low" style={{ display: 'none' }} />}
      </div>
    </div>
  );
}
