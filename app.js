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
    // sanitize code from client remove character
    let outString = req.query.address.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
      ''
    );
    if (!outString) {
      return res.send({ error: 'need input to search' });
    }

    geocode(outString, (err, data = '') => {
      if (err) return res.send({ error: err });

      weather(data, (err, result) => {
        if (err) return res.send(err);
        res.send({ ...result, address: req.query.address, err });
      });
    });
  } catch (err) {
    res.send({ error: 'unable to process your request' });
  }
});

app.listen(port, err => {
  if (err) console.log(err);
  console.log('app is running on port: ' + port);
});
