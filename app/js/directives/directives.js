'use strict';

var directives = angular.module('directives', []);

//requires

require('./nav-directive')(directives);
require('./team-form-directive')(directives);