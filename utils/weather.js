const request = require('request');

const weather = (data, cb) => {
  const { latitude, longtitude, address } = data;
  const darkskyUrl = `https://api.darksky.net/forecast/985e68495ace6a7341b4e310690f7f3c/${latitude},${longtitude}`;

  request({ url: darkskyUrl, json: true }, (error, res) => {
    if (error) return cb('unable to find wather', undefined);
    const dataRes = res.body;
    const result =
      dataRes.daily.data[0].summary +
      ' it is currently ' +
      dataRes.currently.temperature +
      ' degrees';
    cb(undefined, result);
  });
};

module.exports = weather;
