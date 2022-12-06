/* eslint-disable @typescript-eslint/no-non-null-assertion */
class CountdownTimer {
	// setup timer values
	selector: string;
	targetDate: Date;
	backgroundColor: string | null;
	foregroundColor: string | null;
	refs: {
		days: HTMLSpanElement | null;
		hours: HTMLSpanElement | null;
		minutes: HTMLSpanElement | null;
		seconds: HTMLSpanElement | null;
	};

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

		// grab divs on frontend using supplied selector ID
		this.refs = {
			days: document.querySelector(`${this.selector} [data-value="days"]`),
			hours: document.querySelector(`${this.selector} [data-value="hours"]`),
			minutes: document.querySelector(
				`${this.selector} [data-value="minutes"]`
			),
			seconds: document.querySelector(
				`${this.selector} [data-value="seconds"]`
			),
		};
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

	updateColors() {
		if (this.backgroundColor != null) {
			this.refs.days!.style.background = this.backgroundColor;
			this.refs.hours!.style.background = this.backgroundColor;
			this.refs.minutes!.style.background = this.backgroundColor;
			this.refs.seconds!.style.background = this.backgroundColor;
		}

		if (this.foregroundColor != null) {
			this.refs.days!.style.color = this.foregroundColor;
			this.refs.hours!.style.color = this.foregroundColor;
			this.refs.minutes!.style.color = this.foregroundColor;
			this.refs.seconds!.style.color = this.foregroundColor;
		}
	}

	// startTimer() {
	// 	const timer = this.getTimeRemaining(this.targetDate);
	// 	console.log(
	// 		'🚀 ~ file: CouterDown.ts ~ line 91 ~ CountdownTimer ~ startTimer ~ timer',
	// 		timer
	// 	);

	// }
}

export default CountdownTimer;
