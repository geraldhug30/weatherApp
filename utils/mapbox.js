const request = require('request');
const geocode = (address, cb) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZ2VyYWxkMTczMCIsImEiOiJjazIyZmI4aHkwbHNmM25ucmY0cGY1cWd1In0._Ril0Wcqhsco8RJIEW-OLA&limit=1`;

  request({ url: mapboxUrl, json: true }, (error, response) => {
    if (error) console.log(error);
    if (!response.body.features)
      return cb('error please try again later', undefined);
    if (response.body.features.length === 0)
      return cb('try another search', undefined);
    const features = response.body.features[0];
    data = {
      latitude: features.center[1],
      longtitude: features.center[0],
      location: features.place_name
    };
    cb(undefined, data);
  });
};

module.exports = geocode;
