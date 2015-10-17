'use strict';

var teamList = require('./sublists/team-list');
var teamSiteList = require('./sublists/team-site-list');
var weekList = require('./sublists/week-list');
var gameTypeList = require('./sublists/game-type-list');
var seasonList = require('./sublists/season-list');
var spreadList = require('./sublists/spread-list');
var spreadMoveList = require('./sublists/spread-move-list');
var spreadStatusList = require('./sublists/spread-status-list');
var totalMoveList = require('./sublists/total-move-list');
var conferenceList = require('./sublists/conference-list');
var divisionList = require('./sublists/division-list');

module.exports = {

          teamAbbrev: teamList,
          teamSite: teamSiteList,
          teamConference: conferenceList,
          opponentAbbrev: teamList,
          opponentConference: conferenceList,
          opponentDivision: divisionList,
          week: weekList,
          gameType: gameTypeList,
          season: seasonList,
          spreadStatus: spreadStatusList,
          spreadClose: spreadList,
          spreadMove: spreadMoveList,
          totalMove: totalMoveList
};