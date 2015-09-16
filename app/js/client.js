'use strict';

require('angular/angular');

require('./games/directives/directives.js');

require('./requirements.js');

var wagerApp = angular.module('wagerApp', ['directives']);

require('./games/games.js')(wagerApp);
