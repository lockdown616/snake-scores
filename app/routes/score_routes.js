var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, client) {

	// finding the top 8 scores
	app.get('/scores', (req, res) => {
		client.collection('scores').find().sort({ score: -1 }).limit(8).toArray(function (err, list) {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(list);
			}
		});
	});

	app.get('/hard-scores', (req, res) => {
		client.collection('hard-scores').find().sort({ score: -1 }).limit(8).toArray(function (err, list) {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(list);
			}
		})
	});


	// submitting scores
	app.post('/scores', (req, res, next) => {
		if (!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("score")) {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		if (typeof req.body.name !== 'string' || typeof req.body.score !== 'number') {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		const alphaNumericRegex = /^[a-z0-9]{0,11}$/i;

		if (!alphaNumericRegex.test(req.body.name) || req.body.score > 999) {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		const score = { name: req.body.name, score: req.body.score };

		client.collection('scores').insertOne(score, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.ops[0]);
			}
		});
		let numberOfScores = 0;
		client.collection('scores').count({}, function (error, n) {
			numberOfScores = n;
			if (numberOfScores >= 10) {
				client.collection('scores').find().sort({ score: 1 }).limit(1).forEach(function (doc) {
					client.collection('scores').remove({ _id: doc._id });
				})
			}
		});
		console.log("New score received")
	});

	app.post('/hard-scores', (req, res, next) => {
		if (!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("score")) {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		if (typeof req.body.name !== 'string' || typeof req.body.score !== 'number') {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		const alphaNumericRegex = /^[a-z0-9]{0,11}$/i;

		if (!alphaNumericRegex.test(req.body.name) || req.body.score > 999) {
			console.log("Received an invalid input");
			res.send({ 'error': 'Invalid input' });
			return;
		}

		const score = { name: req.body.name, score: req.body.score };
		client.collection('hard-scores').insertOne(score, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred' });
			} else {
				res.send(result.ops[0]);
			}
		});

		let numberOfScores = 0;
		client.collection('hard-scores').count({}, function (error, n) {
			numberOfScores = n;
			if (numberOfScores >= 10) {
				client.collection('hard-scores').find().sort({ score: 1 }).limit(1).forEach(function (doc) {
					client.collection('hard-scores').remove({ _id: doc._id });
				})
			}
		});

		console.log(req.score)
	});
}