"use client";
import "@fontsource/inter";
import "./page.scss";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import Link from "next/link";
import { useState, useEffect } from "react";

import { getSweepState, SweepState } from "./sweepState";

const STATE_CONFIG: Record<SweepState, { label: string; emoji: string; className: string }> = {
	today: {
		label: "Street sweeping is TODAY!",
		emoji: "🚨",
		className: "urgent",
	},
	"this-wednesday": {
		label: "Street sweeping this Wednesday!",
		emoji: "😱",
		className: "urgent",
	},
	safe: {
		label: "NO street sweeping this Wednesday",
		emoji: "🎉",
		className: "safe",
	},
};

function Sweep() {
	const [state, setState] = useState<SweepState | null>(null);

	useEffect(() => {
		setState(getSweepState(new Date()));
	}, []);

	const config = state ? STATE_CONFIG[state] : null;

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
				{config && (
					<div className="sweep-info">
						<span className={config.className}>{config.label}</span>
						<span className="emoji">{config.emoji}</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default Sweep;
