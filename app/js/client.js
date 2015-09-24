'use strict';

require('./requirements');

require('angular/angular');
require('angular-route');

require('./directives/directives.js');

var wagerApp = angular.module('wagerApp', ['directives', 'ngRoute']);

require('./games.js')(wagerApp);

wagerApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      templateUrl: '/html/templates/nfl.html',
      controller: 'gamesController'
    })
    .when('/nba', {
      templateUrl: '/html/templates/nba.html',
      controller: 'gamesController'
    })
    .when('/nfl', {
      templateUrl: '/html/templates/nfl.html',
      controller: 'gamesController'
    })
    .when('/cfb', {
      templateUrl: '/html/templates/cfb.html',
      controller: 'gamesController'
    })
    .when('/about', {
      templateUrl: '/html/about.html',
      controller: 'gamesController'
    });
  }]);
