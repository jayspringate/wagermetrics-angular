'use strict';

module.exports = function(app) {
  app.directive('navDirective', function() {
    return {

      //directive can only contain one outer, parent element - cannot have siblings

      restrict: 'AC',
      replace: true, //replaces placement element
      template: '<nav class="navBar"><h1 class="leftNavHeader">NBA</h1><h1 class="midNavHeader">NFL</h1><h2 class="comingSoon">coming soon!</h2><h1 class="midNavHeader">NCAAFB</h1><h2 class="comingSoon">coming soon!</h2></nav>',
      scope: {} //scope specific to this directive, can set default values inside
    };
  });
};