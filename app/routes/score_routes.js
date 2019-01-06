var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
	
	// finding the top 10 scores
	app.get('/scores', (req, res, next) => {
		res.send(client.collection.find().sort({score:-1}).limit(10));
  });
	
	
	// submitting a score
	app.post('/scores', (req, res, next) => {
		const score = { name: req.body.name, score: req.body.score };
		client.collection('scores').insertOne(score, (err, result) => {
			if (err) { 
				res.send({ 'error': 'An error has occurred' }); 
			} else {
				res.send(result.ops[0]);
			}
		});
	console.log(req.score)
  });
  
    app.put('/notes/:id', (req, res, next) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		const score = { name: req.body.name, score: req.body.score };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};