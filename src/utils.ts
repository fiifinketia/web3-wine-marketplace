export function generateRandomColor() {
	const maxVal = 0xffffff; // 16777215
	let randomNumber = Math.random() * maxVal;
	randomNumber = Math.floor(randomNumber);
	const randColor = randomNumber.toString(16).padStart(6, '0');
	return randColor.toUpperCase();
}

export function getYears(monthCount: number) {
	function getPlural(number: number, word: { [key: string]: string }) {
		return (number === 1 && word.one) || word.other;
	}

	const months = { one: 'mo', other: 'mos' },
		years = { one: 'yr', other: 'yrs' },
		m = monthCount % 12,
		y = Math.floor(monthCount / 12);

	if (y == 0) return m + ' ' + getPlural(m, months);
	else
		return y + ' ' + getPlural(y, years) + ' ' + m + ' ' + getPlural(m, months);
}
