const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');


const app = express();

const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors())

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err)
  
  client = client.db("snake-scores")
  require('./app/routes')(app, client);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})