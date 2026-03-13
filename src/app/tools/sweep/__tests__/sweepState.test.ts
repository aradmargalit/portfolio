import { describe, it, expect } from "vitest";
import { getSweepState } from "../sweepState";

// Helpers to build dates without worrying about time-of-day
const date = (year: number, month: number, day: number) =>
	new Date(year, month - 1, day);

describe("getSweepState", () => {
	describe("today state — sweep day falls on today (Wednesday)", () => {
		it("returns 'today' on the 2nd Wednesday of the month", () => {
			// March 12, 2025 is the 2nd Wednesday of March 2025
			expect(getSweepState(date(2025, 3, 12))).toBe("today");
		});

		it("returns 'today' on the 4th Wednesday of the month", () => {
			// March 26, 2025 is the 4th Wednesday of March 2025
			expect(getSweepState(date(2025, 3, 26))).toBe("today");
		});
	});

	describe("this-wednesday state — sweep day is coming this Wednesday", () => {
		it("returns 'this-wednesday' when today is Monday before a sweep Wednesday", () => {
			// March 10, 2025 (Monday) → next Wed is March 12 (2nd Wed)
			expect(getSweepState(date(2025, 3, 10))).toBe("this-wednesday");
		});

		it("returns 'this-wednesday' when today is Tuesday before a sweep Wednesday", () => {
			// March 11, 2025 (Tuesday) → next Wed is March 12 (2nd Wed)
			expect(getSweepState(date(2025, 3, 11))).toBe("this-wednesday");
		});
	});

	describe("safe state — no sweep this Wednesday", () => {
		it("returns 'safe' on the 1st Wednesday of the month", () => {
			// March 5, 2025 is the 1st Wednesday of March 2025
			expect(getSweepState(date(2025, 3, 5))).toBe("safe");
		});

		it("returns 'safe' on the 3rd Wednesday of the month", () => {
			// March 19, 2025 is the 3rd Wednesday of March 2025
			expect(getSweepState(date(2025, 3, 19))).toBe("safe");
		});

		it("returns 'safe' when this Wednesday is a non-sweep Wednesday", () => {
			// March 17, 2025 (Monday) → next Wed is March 19 (3rd Wed)
			expect(getSweepState(date(2025, 3, 17))).toBe("safe");
		});
	});

	describe("month boundary — this Wednesday falls in the next month", () => {
		it("returns 'safe' when the coming Wednesday is the 1st of next month", () => {
			// March 30, 2025 (Sunday) → next Wed is April 2 (1st Wed of April)
			expect(getSweepState(date(2025, 3, 30))).toBe("safe");
		});

		it("returns 'this-wednesday' when the coming Wednesday is the 2nd Wed of next month", () => {
			// April 6, 2025 (Sunday) → next Wed is April 9 (2nd Wed of April)
			expect(getSweepState(date(2025, 4, 6))).toBe("this-wednesday");
		});
	});
});
