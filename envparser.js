const DotEnv = require('dotenv');
const parsedEnv = DotEnv.config().parsed;
module.exports = function () {
	const keys = Object.keys(parsedEnv);
	// Let's stringify our variables
	keys.forEach(key => {
		if (typeof parsedEnv[key] === 'string') {
			parsedEnv[key] = JSON.parse(JSON.stringify(parsedEnv[key]));
		}
	});
	return parsedEnv;
};
