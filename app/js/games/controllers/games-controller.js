'use strict';

module.exports = function(app) {

  app.controller('gamesController', ['$scope', '$http', function($scope, $http) {

    $scope.games = [];
    $scope.selected = {};
    $scope.resultsTable = false;
    $scope.dropdownLists = require('../dropdown-lists/dropdown-lists.js');

    $http.get('/api/games')
      .then(function(res) {
        //success
        $scope.games = res.data;
      }, function(res) {
        //error
        $scope.errors.push({
          msg: 'could not retrieve games from server'
        });
      });

    $scope.filterGames = function() {

      $scope.filteredGames = $scope.games;
      $scope.errors = [];
      $scope.property = [];
      $scope.selection = [];
      $scope.winCount = 0;
      $scope.lossCount = 0;
      $scope.pushCount = 0;
      $scope.overCount = 0;
      $scope.underCount = 0;
      $scope.pushTotalCount = 0;
      $scope.roiSpreadNet = 0;
      $scope.roiOverNet = 0;
      $scope.roiUnderNet = 0;
      $scope.roiTotalWagered = 0;
      $scope.spreadRoi = {};
      $scope.overRoi = {};
      $scope.underRoi = {};

      for (var prop in $scope.selected) {
        if (!!$scope.selected[prop]) {
          $scope.property.push(prop);
          $scope.selection.push($scope.selected[prop].value);
        }
      }

      $scope.property.forEach(function(propElement, propIndex, propArr) {

        $scope.filteredGames = $scope.filteredGames.filter(function(game, gameIndex, gameArr) {
          if (game[propElement] == $scope.selection[propIndex]) {
            return game;
          }
        });
      });

      $scope.filteredGames = $scope.filteredGames.sort(function(a, b) {
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

      function gradeCount() {
        for (var i = 0; i < $scope.filteredGames.length; i++) {
          if ($scope.filteredGames[i].atsGrade == "W") {
            $scope.winCount++;
            $scope.roiSpreadNet++;
            $scope.roiTotalWagered += 1.1;
          } else if ($scope.filteredGames[i].atsGrade == "L") {
            $scope.lossCount++;
            $scope.roiSpreadNet -= 1.1;
            $scope.roiTotalWagered += 1.1;
          } else {
            $scope.pushCount++;
            $scope.roiTotalWagered += 1.1;
          }
        }
      }

      gradeCount();

      function totalGradeCount() {
        for (var i = 0; i < $scope.filteredGames.length; i++) {
          if ($scope.filteredGames[i].totalGrade == "O") {
            $scope.overCount++;
            $scope.roiOverNet++;
            $scope.roiUnderNet -= 1.1;
          } else if ($scope.filteredGames[i].totalGrade == "U") {
            $scope.underCount++;
            $scope.roiUnderNet++;
            $scope.roiOverNet -= 1.1;
          } else {
            $scope.pushTotalCount++;
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

      $scope.percentWin = runCalcs($scope.winCount, $scope.winCount, $scope.lossCount);
      $scope.percentOver = runCalcs($scope.overCount, $scope.overCount, $scope.underCount);
      $scope.percentUnder = runCalcs($scope.underCount, $scope.underCount, $scope.overCount);
      $scope.spreadRoi.val = runCalcs($scope.roiSpreadNet, $scope.roiTotalWagered, 0);
      $scope.overRoi.val = runCalcs($scope.roiOverNet, $scope.roiTotalWagered, 0);
      $scope.underRoi.val = runCalcs($scope.roiUnderNet, $scope.roiTotalWagered, 0);

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

      $scope.resultsTableGames = $scope.filteredGames.slice(0,99);

      $scope.resultsTable = true;
    };

  }]);
};