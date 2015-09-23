'use strict';

require('angular/angular');

require('./requirements');

require('./games/directives/directives.js');

var wagerApp = angular.module('wagerApp', ['directives']);

require('./games/games.js')(wagerApp);
