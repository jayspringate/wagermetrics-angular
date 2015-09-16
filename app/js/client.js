'use strict';

require('angular/angular');

require('./requirements.js');

var wagerApp = angular.module('wagerApp', []);

require('./games/games.js')(wagerApp);