require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Routes
const urlRoutes = require('./routes/urlRoutes');

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

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

// Static files
app.use('/public', express.static(`${process.cwd()}/public`));

// Body parsing
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', function (req, res) {
  res.status(200)render('index', {message: 'Shorten your URL'});
});

// URL routes
app.use('/api', urlRoutes);