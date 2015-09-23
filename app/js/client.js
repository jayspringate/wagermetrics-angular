'use strict';

require('./requirements');

require('angular/angular');

require('./games/directives/directives.js');

var wagerApp = angular.module('wagerApp', ['directives']);

require('./games/games.js')(wagerApp);
