'use strict';

module.exports = function(app) {
  app.directive('buttonDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'html/templates/button-directive-template.html',
      scope: true
    };
  });
};