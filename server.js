const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err)
  
  client = client.db("snake-scores")
  require('./app/routes')(app, client);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})