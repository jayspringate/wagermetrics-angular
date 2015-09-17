'use strict';

var teamList = require('./sublists/team-list');
var courtList = require('./sublists/court-list');
var gameTypeList = require('./sublists/game-type-list');
var seasonList = require('./sublists/season-list');
var spreadList = require('./sublists/spread-list');
var spreadMoveList = require('./sublists/spread-move-list');
var statusList = require('./sublists/status-list');
var totalMoveList = require('./sublists/total-move-list');

module.exports = {
          team: teamList,
          court: courtList,
          opponent: teamList,
          gameType: gameTypeList,
          season: seasonList,
          status: statusList,
          spread: spreadList,
          spreadMove: spreadMoveList,
          totalMove: totalMoveList
        };