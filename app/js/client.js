'use strict';

require('angular/angular');

var wagerApp = angular.module('wagerApp', []);

require('./games/games.js')(wagerApp);