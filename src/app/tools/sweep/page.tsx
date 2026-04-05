"use client";
import "./page.scss";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getSweepState, SweepState } from "./sweepState";

const STATE_CONFIG: Record<
	SweepState,
	{ headline: string; subtext: string; emoji: string; className: string; trailColor: string }
> = {
	today: {
		headline: "MOVE YOUR CAR!!",
		subtext: "Street sweeping is TODAY 🚨",
		emoji: "🚨",
		className: "urgent",
		trailColor: "#ff3333",
	},
	"this-wednesday": {
		headline: "Heads up!",
		subtext: "Street sweeping this Wednesday 😱",
		emoji: "😱",
		className: "urgent",
		trailColor: "#ff7733",
	},
	safe: {
		headline: "You're in the clear!",
		subtext: "No street sweeping this Wednesday 🎉",
		emoji: "🎉",
		className: "safe",
		trailColor: "#33cc33",
	},
};

function StreetSweeperTruck({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 260 130"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			{/* Main truck body */}
			<rect x="5" y="32" width="185" height="62" rx="8" fill="#f0f4fa" />
			{/* Cab */}
			<rect x="168" y="15" width="62" height="79" rx="8" fill="#1a5fa8" />
			{/* Windshield */}
			<rect x="176" y="23" width="38" height="30" rx="5" fill="#a8d8ff" opacity="0.9" />
			{/* Body accent stripe */}
			<rect x="5" y="42" width="165" height="4" rx="2" fill="#1a5fa8" opacity="0.7" />
			{/* Exhaust pipe */}
			<rect x="215" y="5" width="7" height="22" rx="3.5" fill="#777" />
			{/* Smoke puffs */}
			<circle cx="218" cy="3" r="4" fill="#ccc" className="smoke smoke1" />
			<circle cx="222" cy="0" r="2.5" fill="#ddd" className="smoke smoke2" />
			{/* CR&R label plate */}
			<rect x="22" y="44" width="90" height="28" rx="4" fill="#1a5fa8" />
			<text
				x="67"
				y="63"
				fontSize="14"
				fontWeight="bold"
				fill="white"
				textAnchor="middle"
				fontFamily="Arial, sans-serif"
				letterSpacing="1"
			>
				CR&amp;R
			</text>
			{/* Warning stripes on cab */}
			<rect x="148" y="70" width="18" height="6" rx="1" fill="#FFD700" opacity="0.8" />
			<rect x="148" y="76" width="18" height="6" rx="1" fill="#333" opacity="0.6" />
			{/* Bumpers */}
			<rect x="5" y="88" width="12" height="6" rx="3" fill="#0d4a8a" />
			<rect x="218" y="82" width="22" height="10" rx="3" fill="#0d4a8a" />
			{/* Rear wheel */}
			<circle cx="62" cy="104" r="18" fill="#222" />
			<circle cx="62" cy="104" r="10" fill="#555" />
			<circle cx="62" cy="104" r="4.5" fill="#aaa" />
			<line x1="62" y1="94" x2="62" y2="114" stroke="#888" strokeWidth="1.5" />
			<line x1="52" y1="104" x2="72" y2="104" stroke="#888" strokeWidth="1.5" />
			{/* Front wheel */}
			<circle cx="183" cy="104" r="18" fill="#222" />
			<circle cx="183" cy="104" r="10" fill="#555" />
			<circle cx="183" cy="104" r="4.5" fill="#aaa" />
			<line x1="183" y1="94" x2="183" y2="114" stroke="#888" strokeWidth="1.5" />
			<line x1="173" y1="104" x2="193" y2="104" stroke="#888" strokeWidth="1.5" />
			{/* Brush arm housing */}
			<rect x="18" y="91" width="50" height="7" rx="3.5" fill="#888" />
			{/* Spinning brush — 16 bristles radiating from center hub */}
			<g className="brush-group">
				{Array.from({ length: 16 }, (_, i) => {
					const angle = (i * Math.PI * 2) / 16;
					const innerR = 4;
					const outerR = 14;
					return (
						<line
							key={i}
							x1={(43 + innerR * Math.cos(angle)).toFixed(2)}
							y1={(109 + innerR * Math.sin(angle)).toFixed(2)}
							x2={(43 + outerR * Math.cos(angle)).toFixed(2)}
							y2={(109 + outerR * Math.sin(angle)).toFixed(2)}
							stroke={i % 2 === 0 ? "#333" : "#555"}
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					);
				})}
				{/* Center hub */}
				<circle cx="43" cy="109" r="4" fill="#888" />
				<circle cx="43" cy="109" r="2" fill="#aaa" />
			</g>
			{/* Water spray nozzle */}
			<rect x="90" y="91" width="12" height="5" rx="2.5" fill="#777" />
			{/* Water droplets */}
			<circle cx="100" cy="110" r="2.5" fill="#55aaff" className="drop drop1" />
			<circle cx="108" cy="114" r="2" fill="#55aaff" className="drop drop2" />
			<circle cx="116" cy="108" r="2.5" fill="#55aaff" className="drop drop3" />
			<circle cx="125" cy="113" r="1.5" fill="#55aaff" className="drop drop4" />
		</svg>
	);
}

type PageState = "idle" | "sweeping" | "revealed";

export default function Sweep() {
	const [sweepState, setSweepState] = useState<SweepState | null>(null);
	const [pageState, setPageState] = useState<PageState>("idle");

	useEffect(() => {
		setSweepState(getSweepState(new Date()));
	}, []);

	const config = sweepState ? STATE_CONFIG[sweepState] : null;

	function handleReveal() {
		if (pageState !== "idle" || !config) return;
		setPageState("sweeping");
		setTimeout(() => setPageState("revealed"), 1500);
	}

	return (
		<div className="sweep">
			<div className="sweep__header">
				<div className="header-left">
					<Link href="/">
						<IoMdArrowBack size="2em" />
					</Link>
				</div>
			</div>

			<div className="sweep__content">
				<h2>Street sweeping this Wednesday?</h2>

				{pageState !== "revealed" && (
					<div
						className={`truck-wrapper ${pageState}`}
						onClick={handleReveal}
						role="button"
						tabIndex={0}
						aria-label="Tap to reveal street sweeping status"
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") handleReveal();
						}}
					>
						<StreetSweeperTruck className="truck-svg" />
						{pageState === "sweeping" && config && (
							<div
								className="sweep-trail"
								style={{ "--trail-color": config.trailColor } as React.CSSProperties}
							/>
						)}
					</div>
				)}

				{pageState === "idle" && (
					<p className="tap-hint">
						<span className="tap-arrow">👆</span> Tap the truck to reveal your fate!
					</p>
				)}

				{pageState === "revealed" && config && (
					<div className="sweep-result">
						<div className="result-emoji">{config.emoji}</div>
						<div className={`result-headline ${config.className}`}>{config.headline}</div>
						<div className="result-subtext">{config.subtext}</div>
						<button className="reset-btn" onClick={() => setPageState("idle")}>
							↺ Ask again
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
