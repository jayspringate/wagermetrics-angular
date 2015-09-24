'use strict';

var teamList = require('./sublists/team-list');
var teamSiteList = require('./sublists/team-site-list');
var weekList = require('./sublists/week-list');
var gameTypeList = require('./sublists/game-type-list');
var seasonList = require('./sublists/season-list');
var spreadList = require('./sublists/spread-list');
var spreadMoveList = require('./sublists/spread-move-list');
var statusList = require('./sublists/status-list');
var totalMoveList = require('./sublists/total-move-list');

module.exports = {

          teamAbbrev: teamList,
          teamSite: teamSiteList,
          opponentAbbrev: teamList,
          week: weekList,
          gameType: gameTypeList,
          season: seasonList,
          status: statusList,
          spreadClose: spreadList,
          spreadMove: spreadMoveList,
          totalMove: totalMoveList
};