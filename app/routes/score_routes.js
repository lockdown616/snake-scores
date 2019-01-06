var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, client) {
	
	// finding the top 10 scores
	app.get('/scores', (req, res) => {
		client.collection('scores').find({ _id: 0 }).sort({score:-1}).limit(10).toArray(function (err, list) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(list);
	}})
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
}