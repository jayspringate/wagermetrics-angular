'use strict';

module.exports = function(app) {
  app.directive('selectRangeDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AEC',
      replace: true, //replaces placement element
      templateUrl: 'html/templates/select-range-directive-template.html',
     //scope specific to this directive, can set default values inside
      scope: {
        listName: '@',
        lessListName: '@',
        greaterListName: '@',
        rangeDisabled: '=',
        equalsDisabled: '=',
        equalsDisableCheck: '=',
        rangeDisableCheck: '=',
        dropdownTitle: '@',
        dropdownLists: '=',
        sportName: '@'
      }
    };
  });
};