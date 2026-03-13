export type SweepState = "today" | "this-wednesday" | "safe";

// Returns whether "this Wednesday" (or today, if today is Wednesday) is a sweep day.
// A Wednesday is a sweep day if it's the 2nd or 4th Wednesday of its month,
// which is equivalent to Math.ceil(date / 7) === 2 or 4.
export function getSweepState(today: Date): SweepState {
	const daysUntilWed = (3 - today.getDay() + 7) % 7;

	const thisWednesday = new Date(today);
	thisWednesday.setDate(today.getDate() + daysUntilWed);

	const nthWednesday = Math.ceil(thisWednesday.getDate() / 7);
	const isSweepWed = nthWednesday === 2 || nthWednesday === 4;

	if (!isSweepWed) return "safe";
	if (daysUntilWed === 0) return "today";
	return "this-wednesday";
}
