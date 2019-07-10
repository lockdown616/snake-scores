var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
	
	// finding the top 8 scores
	app.get('/scores', (req, res) => {
		client.collection('scores').find().sort({score:-1}).limit(8).toArray(function (err, list) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(list);
	}})
    });
	
	app.get('/hard-scores', (req, res) => {
		client.collection('hard-scores').find().sort({score:-1}).limit(8).toArray(function (err, list) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(list);
	}})
    });
	
	
	// submitting scores
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
	
	app.post('/hard-scores', (req, res, next) => {
		const score = { name: req.body.name, score: req.body.score };
		client.collection('hard-scores').insertOne(score, (err, result) => {
			if (err) { 
				res.send({ 'error': 'An error has occurred' }); 
			} else {
				res.send(result.ops[0]);
			}
		});
	console.log(req.score)
	});
}