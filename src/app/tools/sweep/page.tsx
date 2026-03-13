"use client";
import "@fontsource/inter";
import "./page.scss";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import Link from "next/link";
import { useState, useEffect } from "react";

type SweepState = "today" | "this-wednesday" | "safe";

// Get the 2nd and 4th Wednesdays of a given month/year
function getStreetSweepingDatesForMonth(year: number, month: number): Date[] {
	const dates: Date[] = [];
	let count = 0;
	for (let day = 1; day <= 31; day++) {
		const date = new Date(year, month, day);
		if (date.getMonth() !== month) break;
		if (date.getDay() === 3) {
			count++;
			if (count === 2 || count === 4) dates.push(date);
		}
	}
	return dates;
}

// Returns whether "this Wednesday" (or today, if today is Wednesday) is a sweep day
function getSweepState(today: Date): SweepState {
	const daysUntilWed = (3 - today.getDay() + 7) % 7;

	const thisWednesday = new Date(today);
	thisWednesday.setDate(today.getDate() + daysUntilWed);
	thisWednesday.setHours(0, 0, 0, 0);

	const sweepDates = getStreetSweepingDatesForMonth(
		thisWednesday.getFullYear(),
		thisWednesday.getMonth(),
	);
	const isSweepWed = sweepDates.some(
		(d) => d.getTime() === thisWednesday.getTime(),
	);

	if (!isSweepWed) return "safe";
	if (daysUntilWed === 0) return "today";
	return "this-wednesday";
}

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
