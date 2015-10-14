'use strict';

var directives = angular.module('directives', []);

//requires

require('./nav-directive')(directives);
require('./select-directive')(directives);
require('./header-directive')(directives);
require('./button-directive')(directives);
require('./top-table-directive')(directives);
require('./select-range-directive')(directives);