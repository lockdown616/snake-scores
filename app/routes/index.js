const scoreRoutes = require('./score_routes');

module.exports = function(app, db) {
  scoreRoutes(app, db);
};