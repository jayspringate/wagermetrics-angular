'use strict';

module.exports = function(app) {
  require('./controllers/games-controller')(app);
};