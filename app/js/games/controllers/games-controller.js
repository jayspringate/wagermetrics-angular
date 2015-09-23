'use strict';

module.exports = function(app) {

  app.controller('gamesController', ['$scope', '$http', function($scope, $http) {

    $scope.games = [];
    $scope.selected = {};
    $scope.hideResultsTable = true;
    $scope.dropdownLists = require('../dropdown-lists/dropdown-lists.js');

      $http.get('/api/games')
        .then(function(res) {
          //success
          $scope.games = res.data;
          console.log($scope.games[0]);
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

      for (var prop in $scope.selected) {
        if (!!$scope.selected[prop]) {
          $scope.property.push(prop);
          $scope.selection.push($scope.selected[prop].value);
        }
      }

        console.log($scope.property);
        console.log($scope.selection);

      $scope.property.forEach(function(propElement, propIndex, propArr) {

      $scope.filteredGames = $scope.filteredGames.filter(function(game, gameIndex, gameArr) {
      if (game[propElement] == $scope.selection[propIndex]) {
        return game;
      }
    });
    });
      $scope.hideResultsTable = false;
      console.log($scope.filteredGames[0]);
  };

  }]);
};