"use client";
import "@fontsource/inter";
import "./page.scss";

import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Helper to get next street sweeping date
function getNextStreetSweepingDate(today: Date): Date {
	const year = today.getFullYear();
	const month = today.getMonth();

	const sweepingDates = getStreetSweepingDatesForMonth(year, month);

	// Find the next sweeping date in current month
	let next = sweepingDates.find((d) => d > today);

	// If none left this month, check next month
	if (!next) {
		const nextMonth = (month + 1) % 12;
		const nextYear = nextMonth === 0 ? year + 1 : year;
		const nextMonthDates = getStreetSweepingDatesForMonth(nextYear, nextMonth);
		next = nextMonthDates[0];
	}

	return next || new Date(); // Fallback to today if no date found
}

// Get the 2nd and 4th Wednesday of a given month/year
function getStreetSweepingDatesForMonth(year: number, month: number): Date[] {
	const dates: Date[] = [];
	let count = 0;
	for (let day = 1; day <= 31; day++) {
		const date = new Date(year, month, day);
		if (date.getMonth() !== month) break; // stop when month rolls over
		if (date.getDay() === 3) {
			// 3 = Wednesday
			count++;
			if (count === 2 || count === 4) {
				dates.push(date);
			}
		}
	}
	return dates;
}

function Sweep() {
	const [daysUntil, setDaysUntil] = useState<number | null>(null);

	useEffect(() => {
		const today = new Date();
		const nextSweep = getNextStreetSweepingDate(today);
		const diffDays = Math.ceil(
			(nextSweep.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
		);
		setDaysUntil(diffDays);
	}, []);

	const isWithin7Days = daysUntil !== null && daysUntil <= 7;

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
				<div className="background-image-container">
					<Image
						src="/truck.png"
						alt="Street sweeping truck"
						width={250}
						height={250}
						className="background-image"
					/>
				</div>
				<h2>Next street sweeping:</h2>
				{daysUntil !== null && (
					<div className="sweep-info">
						<span className={isWithin7Days ? "urgent" : "safe"}>
							{daysUntil} {daysUntil === 1 ? "day" : "days"} away
						</span>
						<span className="emoji">{isWithin7Days ? "😱" : "🎉"}</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default Sweep;
