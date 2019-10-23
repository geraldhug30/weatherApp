const app = require('express')();
const port = 3000 || process.env.PORT;
//api

const geocode = require('./utils/mapbox');
const weather = require('./utils/weather');

app.get('/', (req, res) => {
  geocode('angeles city', (err, data) => {
    if (err) console.log(err);

    weather(data, (err, result) => {
      if (err) console.log(err);
      res.send(data.location + ' : ' + result);
    });
  });
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log('app is running on port: ' + port);
});
