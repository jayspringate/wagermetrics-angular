'use strict';

var teamList = require('./sublists/team-list');
var teamSiteList = require('./sublists/team-site-list');
var gameTypeList = require('./sublists/game-type-list');
var seasonList = require('./sublists/season-list');
var spreadList = require('./sublists/spread-list');
var spreadGreaterList = require('./sublists/spread-greater-list');
var spreadLessList = require('./sublists/spread-less-list');
var spreadMoveList = require('./sublists/spread-move-list');
var spreadStatusList = require('./sublists/spread-status-list');
var totalMoveList = require('./sublists/total-move-list');

module.exports = {

          team: teamList,
          teamSite: teamSiteList,
          opponent: teamList,
          gameType: gameTypeList,
          season: seasonList,
          spreadStatus: spreadStatusList,
          spreadClose: spreadList,
          spreadCloseGreater: spreadGreaterList,
          spreadCloseLess: spreadLessList,
          spreadMove: spreadMoveList,
          totalMove: totalMoveList
};