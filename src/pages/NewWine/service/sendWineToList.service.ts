import axios from 'axios';

export async function sendWineToList(
	name: string,
	lwin: string,
	packSize: string,
	bottleSize: string,
	tokenID: number,
	smartContract: string
) {
	const result = await axios
		.post('http://localhost:3600/suggestion/sendWineToList', [
			{ name, lwin, packSize, bottleSize, tokenID, smartContract },
		])
		.then((res) => {
			return res;
		});
	return result;
}
