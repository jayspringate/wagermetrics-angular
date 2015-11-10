'use strict';

module.exports = function(app) {
  app.directive('navDirective', ['$location', function(location) {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'html/templates/nav-directive-template.html',
      link: function (scope, element) {
        if (location.path() === '/nba') {
          scope.nbaPath = true;
        } else if(location.path() === '/nfl' || location.path() === '/') {
          scope.nflPath = true;
        } else if(location.path() === '/cfb') {
          scope.cfbPath = true;
        }
      },
      scope: {       //scope specific to this directive, can set default values inside
        nbaPath: '=',
        nflPath: '=',
        cfbPath: '=',
      }
    };
  }]);
};