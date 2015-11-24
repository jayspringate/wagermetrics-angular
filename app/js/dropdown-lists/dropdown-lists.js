'use strict';

var nbaList = require('./nba/nba-list');
var cfbList = require('./cfb/cfb-list');
var cbbList = require('./cbb/cbb-list');
var nflList = require('./nfl/nfl-list');

module.exports = {

          nba: nbaList,
          nfl: nflList,
          cfb: cfbList,
          cbb: cbbList
};