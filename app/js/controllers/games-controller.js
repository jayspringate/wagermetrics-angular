'use strict';

module.exports = function(app) {

  app.controller('gamesController', ['$scope', '$http', '$location', function($scope, $http, $location) {

    $scope.games = [];
    $scope.selected = {};
    $scope.selectedLess = {};
    $scope.selectedGreater = {};
    $scope.equalsDisabled = {};
    $scope.rangeDisabled = {};
    $scope.resultsTable = false;
    $scope.path = $location.path();
    $scope.errors = [];
    $scope.nbaPath = false;
    $scope.cfbPath = false;
    $scope.nflPath = false;
    $scope.aboutPath = false;
    $scope.cbbPath = false;
    $scope.buttonText = 'Get Results';
    $scope.dropdownLists = require('../dropdown-lists/dropdown-lists.js');



    $scope.rangeDisableCheck = function(listName) {

      if (!!$scope.selected[listName]) {
        $scope.rangeDisabled[listName] = true;
      } else {
        $scope.equalsDisabled[listName] = false;
        $scope.rangeDisabled[listName] = false;
      }

    };

    $scope.equalsDisableCheck = function(listName, lessListName, greaterListName) {

      if (!!$scope.selectedGreater[greaterListName] ||
          !!$scope.selectedLess[lessListName]) {
        $scope.equalsDisabled[listName] = true;
      } else {
        $scope.equalsDisabled[listName] = false;
        $scope.rangeDisabled[listName] = false;
      }
    };

    $scope.filterGames = function() {
      $scope.winCount = '';
      $scope.lossCount = '';
      $scope.pushCount = '';
      $scope.overCount = '';
      $scope.underCount = '';
      $scope.pushTotalCount = '';
      $scope.roiSpreadNet = '';
      $scope.roiOverNet = '';
      $scope.roiUnderNet = '';
      $scope.percentWin = '';
      $scope.percentOver = '';
      $scope.percentUnder = '';
      $scope.errors = [];
      $scope.property = [];
      $scope.params = {};
      $scope.propertyGreater = [];
      $scope.propertyLess = [];
      $scope.selection = [];
      $scope.selectionGreater = [];
      $scope.selectionLess = [];
      var winCount = 0;
      var lossCount = 0;
      var pushCount = 0;
      var overCount = 0;
      var underCount = 0;
      var pushTotalCount = 0;
      var roiSpreadNet = 0;
      var roiOverNet = 0;
      var roiUnderNet = 0;
      var roiTotalWagered = 0;
      $scope.spreadRoi = {};
      $scope.overRoi = {};
      $scope.underRoi = {};

      for (var prop in $scope.selected) {
        if (!!$scope.selected[prop]) {
          $scope.params[prop] = $scope.selected[prop].value;
        }
      }

      $scope.buttonText = 'Loading Games...';

      if ($scope.path === '/') {
        $scope.path = '/nfl';
      }

      $http.get('/api' + $scope.path, {
          params: $scope.params
        })
        .then(function(res) {
          //success
          $scope.games = res.data;
          $scope.buttonText = 'Get Results';

          for (var propGreater in $scope.selectedGreater) {
            if (!!$scope.selectedGreater[propGreater]) {
              $scope.propertyGreater.push(propGreater.split('Greater')[0]);
              $scope.selectionGreater.push(parseFloat($scope.selectedGreater[propGreater].value.split('>=')[1]));
            }
          }

          for (var propLess in $scope.selectedLess) {
            if (!!$scope.selectedLess[propLess]) {
              $scope.propertyLess.push(propLess.split('Less')[0]);
              $scope.selectionLess.push(parseFloat($scope.selectedLess[propLess].value.split('<=')[1]));
            }
          }

          $scope.propertyGreater.forEach(function(propElement, propIndex, propArr) {

            $scope.games = $scope.games.filter(function(game, gameIndex, gameArr) {
              if (game[propElement] >= $scope.selectionGreater[propIndex]) {
                return game;
              }
            });
          });

          $scope.propertyLess.forEach(function(propElement, propIndex, propArr) {

            $scope.games = $scope.games.filter(function(game, gameIndex, gameArr) {
              if (game[propElement] <= $scope.selectionLess[propIndex]) {
                return game;
              }
            });
          });

          function gradeCount() {
            for (var i = 0; i < $scope.games.length; i++) {
              if ($scope.games[i].atsGrade == "W") {
                winCount++;
                roiSpreadNet++;
                roiTotalWagered += 1.1;
              } else if ($scope.games[i].atsGrade == "L") {
                lossCount++;
                roiSpreadNet -= 1.1;
                roiTotalWagered += 1.1;
              } else if ($scope.games[i].atsGrade == "P") {
                pushCount++;
                roiTotalWagered += 1.1;
              }
            }
          }

          gradeCount();

          function totalGradeCount() {
            for (var i = 0; i < $scope.games.length; i++) {
              if ($scope.games[i].totalGrade == "O") {
                overCount++;
                roiOverNet++;
                roiUnderNet -= 1.1;
              } else if ($scope.games[i].totalGrade == "U") {
                underCount++;
                roiUnderNet++;
                roiOverNet -= 1.1;
              } else if ($scope.games[i].totalGrade == "P") {
                pushTotalCount++;
              }
            }
          }

          totalGradeCount();

          function runCalcs(aCount, bCount, cCount) {

            function calc() {
              return Math.round(100 * (aCount / (bCount + cCount) * 10)) / 10;
            }

            if (isNaN(calc(aCount, bCount, cCount))) {
              return "N/A";
            } else {
              return calc(aCount, bCount, cCount) + "%";
            }
          }

          $scope.percentWin = runCalcs(winCount, winCount, lossCount);
          $scope.percentOver = runCalcs(overCount, overCount, underCount);
          $scope.percentUnder = runCalcs(underCount, underCount, overCount);
          $scope.spreadRoi.val = runCalcs(roiSpreadNet, roiTotalWagered, 0);
          $scope.overRoi.val = runCalcs(roiOverNet, roiTotalWagered, 0);
          $scope.underRoi.val = runCalcs(roiUnderNet, roiTotalWagered, 0);

          function roiColor(field) {
            if (parseFloat(field.val.split('%')[0]) > 0) {
              field.colorBool = 'green';
            } else if (parseFloat(field.val.split('%')[0]) < 0) {
              field.colorBool = 'red';
            }
          }

          roiColor($scope.spreadRoi);
          roiColor($scope.overRoi);
          roiColor($scope.underRoi);

          $scope.games = $scope.games.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            if (a < b) {
              return 1;
            } else if (a > b) {
              return -1;
            } else {
              return 0;
            }
          });

          $scope.games.forEach(function(el, i, arr) {
            if (el.spreadOpen === 99 || el.spreadOpen === -99) {
              el.spreadOpen = 'OFF';
            }
            if (el.spreadClose === 99 || el.spreadClose === -99) {
              el.spreadClose = 'OFF';
            }
            if (el.totalOpen === 99) {
              el.totalOpen = 'OFF';
            }
            if (el.totalClose === 99) {
              el.totalClose = 'OFF';
            }
          });

          $scope.winCount = winCount;
          $scope.lossCount = lossCount;
          $scope.pushCount = pushCount;
          $scope.overCount = overCount;
          $scope.underCount = underCount;
          $scope.pushTotalCount = pushTotalCount;
          $scope.roiSpreadNet = roiSpreadNet;
          $scope.roiOverNet = roiOverNet;
          $scope.roiUnderNet = roiUnderNet;

          $scope.resultsTableGames = $scope.games.slice(0, 49);
          $scope.resultsTable = true;
        }, function(res) {
          //error
          $scope.errors.push({
            msg: 'could not retrieve games from server'
          });
        });
    };
  }]);
};