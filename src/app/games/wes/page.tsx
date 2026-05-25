'use client';
import './page.scss';

import { IoMdArrowBack } from '@react-icons/all-files/io/IoMdArrowBack';
import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { ITEMS, QuizItem } from './items';

const COUNTDOWN_SECONDS = 10;

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

export default function WesQuiz() {
  const [deck, setDeck] = useState<QuizItem[]>(() => shuffle(ITEMS));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('counting');
  const [remaining, setRemaining] = useState(COUNTDOWN_SECONDS);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
          playPop();
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return clearTick;
  }, [phase, clearTick]);

  const next = useCallback(() => {
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

  if (!current) {
    return (
      <div className="wes">
        <p>
          No items configured yet. Add some to <code>src/app/games/wes/items.ts</code>.
        </p>
      </div>
    );
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

      <div className="wes__stage">
        <button
          type="button"
          className={`image-card phase-${phase}`}
          onClick={handleImageTap}
          aria-label={phase === 'revealed' ? 'Next' : phase === 'counting' ? 'Pause timer' : 'Resume timer'}
        >
          {/* Plain <img> keeps things simple for user-supplied files in /public */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.image} alt="Guess what this is" draggable={false} />
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
                <div className="timer-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className={`timer-num ${phase === 'paused' ? 'paused' : ''}`}>
                {phase === 'paused' ? '⏸' : remaining}
              </div>
            </>
          )}
        </div>

        <div className="controls">
          {phase === 'revealed' ? (
            <button className="btn primary" onClick={next}>
              Next →
            </button>
          ) : (
            <button className="btn ghost" onClick={reveal}>
              Reveal now
            </button>
          )}
        </div>

        <p className="hint">
          {phase === 'counting' && 'Tap the picture to pause the timer.'}
          {phase === 'paused' && 'Paused — tap the picture to resume.'}
          {phase === 'revealed' && 'Tap the picture or hit Next for another!'}
        </p>
      </div>
    </div>
  );
}
