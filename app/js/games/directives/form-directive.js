'use strict';

module.exports = function(app) {
  app.directive('formDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AC',
      replace: true, //replaces placement element
      templateUrl: 'js/games/templates/form-directive-template.html',
      transclude: true,
     //scope specific to this directive, can set default values inside
      scope: {
        formClassName: '@',
        listId: '@',
        dropdownTitle: '@'
      }
    };
  });
};