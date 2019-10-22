const request = require('request');

const url =
  'https://api.darksky.net/forecast/985e68495ace6a7341b4e310690f7f3c/37.8267,-122.4233';

request(url, async (error, res) => {
  const data = JSON.parse(res.body);
  console.log(data.currently.temperature);
});
