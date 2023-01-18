/* eslint-disable @typescript-eslint/no-non-null-assertion */
class CountdownTimer {
	// setup timer values
	selector: string;
	targetDate: Date;
	backgroundColor: string | null;
	foregroundColor: string | null;

	constructor({
		selector,
		targetDate,
		backgroundColor = null,
		foregroundColor = null,
	}: {
		selector: string;
		targetDate: Date;
		backgroundColor?: string | null;
		foregroundColor?: string | null;
	}) {
		this.selector = selector;
		this.targetDate = targetDate;
		this.backgroundColor = backgroundColor;
		this.foregroundColor = foregroundColor;
	}

	getTimeRemaining() {
		const total =
			Date.parse(this.targetDate.toString()) -
			Date.parse(new Date().toString());
		const days = Math.floor(total / (1000 * 60 * 60 * 24));
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const seconds = Math.floor((total / 1000) % 60);
		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	updateTimer({
		days,
		hours,
		minutes,
		seconds,
	}: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	}) {
		return {
			days,
			hours,
			minutes,
			seconds,
		};
	}
}

export default CountdownTimer;
