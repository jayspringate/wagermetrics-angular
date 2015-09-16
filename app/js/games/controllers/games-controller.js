'use strict';

module.exports = function (app) {
  app.controller('gamesController', ['$scope', '$http', function($scope, $http) {

      $scope.games = [];
      $scope.errors = [];

      $scope.getAll = function () {

      $http.get('/api/games')
        .then(function (res) {
          //success
          $scope.games = res.data;
        }, function (res) {
          //error
          $scope.errors.push({msg: 'could not retrieve games from server'});
          console.log(res.data);
        });
      };
  }]);
};