'use strict';

module.exports = function(app) {
  app.directive('selectDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'html/templates/select-directive-template.html',
     //scope specific to this directive, can set default values inside
      scope: {
        containerClassName: '@',
        selectClassName: '@',
        listName: '@',
        dropdownTitle: '@',
        dropdownLists: '=',
        sportName: '@'
      }
    };
  });
};