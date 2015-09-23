'use strict';

module.exports = function(app) {
  app.directive('formDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'js/games/templates/form-directive-template.html',
     //scope specific to this directive, can set default values inside
      scope: {
        formClassName: '@',
        listName: '@',
        dropdownTitle: '@',
        dropdownLists: '=',
      }
    };
  });
};