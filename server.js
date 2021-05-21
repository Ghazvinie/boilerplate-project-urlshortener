require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Basic Configuration
const port = process.env.PORT || 3000;

// Connect to DB and then server listen
mongoose.connect(keys.mongodb.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to db...')
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', (req, res) => {
  const shortURL = req.body.url.trim().tolowercase().split('//');
  const randomString = Math.random().toString(16).substr(2, 8);
  console.log(randomString);

  dns.lookup(shortURL[shortURL.length - 1], (error) => {
    if (error) {
      res.json({ error: 'invalid url' });
    }
    else {
      console.log('hello');
    }

  });
});


