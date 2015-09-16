'use strict';

module.exports = function(app) {
  app.directive('teamFormDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AC',
      replace: true, //replaces placement element
      template: '<form><select autocomplete="off" id="team" class="grid_6 push_5"><option value="blank" selected="selected">Team</option><option data-ng-repeat="team in teamList" data-ng-value="{{team.value}}">{{team.name}}</option></select></form>',
     //scope specific to this directive, can set default values inside
      scope: {
        teamList: '='
      }
    };
  });
};