const scoreRoutes = require('./score_routes');

module.exports = function(app, db) {
  scoreRoutes(app, db);
  // Other route groups could go here, in the future
};