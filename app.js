const express = require('express');
const port = 3000 || process.env.PORT;
const app = express();
//api

const geocode = require('./utils/mapbox');
const weather = require('./utils/weather');

// pereferencial
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/weather', async (req, res) => {
  try {
    geocode(req.query.address, (err, data) => {
      if (err) return res.send(err);
      weather(data, (err, result) => {
        if (err) return res.send(err);
        res.send({ ...result, address: req.query.address });
      });
    });
  } catch (err) {
    res.send({ error: 'unable to process your request' });
  }
});

// geocode('japan', (err, data) => {
//   if (err) console.log(err);

//   weather(data, (err, result) => {
//     if (err) console.log(err);
//     res.send(data.location + ' : ' + result);
//   });
// });

app.listen(port, err => {
  if (err) console.log(err);
  console.log('app is running on port: ' + port);
});
