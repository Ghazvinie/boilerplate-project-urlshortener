require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const urlRoutes = require('./routes/urlRoutes');

// Basic Configuration
const port = process.env.PORT || 3000;

// Connect to DB and then server listen
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to db...');
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

app.use('/api', urlRoutes);