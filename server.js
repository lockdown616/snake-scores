const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');


const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors());

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);

  client = client.db("snake-scores");
  require('./app/routes')(app, client);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})