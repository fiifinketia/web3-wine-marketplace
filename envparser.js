const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function () {
  // Let's stringify our variables
  for (key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      console.log(JSON.stringify(parsedEnv[key]))
      parsedEnv[key] = JSON.parse(JSON.stringify(parsedEnv[key]))
    }
  }
  return parsedEnv
}
