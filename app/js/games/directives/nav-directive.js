'use strict';

module.exports = function(app) {
  app.directive('navDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'js/games/templates/nav-directive-template.html',
      scope: {} //scope specific to this directive, can set default values inside
    };
  });
};