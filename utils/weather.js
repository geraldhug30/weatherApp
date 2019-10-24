const request = require('request');

const weather = (data, cb) => {
  console.log(data);
  if (data === undefined) {
    cb('error porcessing', undefined);
  }
  const { latitude, longtitude, location } = data;
  const darkskyUrl = `https://api.darksky.net/forecast/985e68495ace6a7341b4e310690f7f3c/${latitude},${longtitude}`;

  request({ url: darkskyUrl, json: true }, (error, res) => {
    if (error) return cb('unable to find wather', undefined);
    const dataRes = res.body;
    const forecast =
      dataRes.daily.data[0].summary +
      ' it is currently ' +
      dataRes.currently.temperature +
      ' degrees';

    const result = {
      forecast,
      location
    };
    cb(undefined, result);
  });
};

module.exports = weather;
