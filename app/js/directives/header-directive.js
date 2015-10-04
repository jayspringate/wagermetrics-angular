'use strict';

module.exports = function(app) {
  app.directive('headerDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'html/templates/header-directive-template.html',
      scope: {
        nbaPath: '=',
        nflPath: '=',
        cfbPath: '='
      } //scope specific to this directive, can set default values inside
    };
  });
};