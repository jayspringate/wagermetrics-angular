'use strict';

require('./requirements');
require('angular/angular');
require('angular-bootstrap-npm');
require('angular-route');

require('./directives/directives.js');

var wagerApp = angular.module('wagerApp', ['directives', 'ngRoute', 'ui.bootstrap']);

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
    .when('/cbb', {
      templateUrl: '/html/templates/cbb.html',
      controller: 'gamesController'
    })
    .when('/about', {
      templateUrl: '/html/templates/about.html',
      controller: 'gamesController'
    });
  }]);
