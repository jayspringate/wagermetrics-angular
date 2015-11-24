'use strict';

var Sql = require('sequelize');
var sql = new Sql(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

var nbaGame = require('../models/nbaGame');
var nflGame = require('../models/nflGame');
var cfbGame = require('../models/cfbGame');
var cbbGame = require('../models/cbbGame');
var bodyparser = require('body-parser');

module.exports = function(router) {

  router.use(bodyparser.json());

  router.get('/nba', function(req, res) {
    sql.sync()
      .then(function() {
        nbaGame.findAll({
          where: req.query
        })
          .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            res.status(500).json({
              msg: 'server error'
            });
          });
      });
  });

  router.get('/nfl', function(req, res) {
    sql.sync()
      .then(function() {
        nflGame.findAll({
          where: req.query
        })
        .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            res.status(500).json({
              msg: 'server error'
            });
          });
      });
  });

  router.get('/cfb', function(req, res) {
    sql.sync()
      .then(function() {
        cfbGame.findAll({
          where: req.query
        })
          .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            res.status(500).json({
              msg: 'server error'
            });
          });
      });
  });

 router.get('/cbb', function(req, res) {
    sql.sync()
      .then(function() {
        cbbGame.findAll({
          where: req.query
        })
          .then(function(data) {
            res.json(data);
          })
          .error(function(err) {
            console.log(err);
            res.status(500).json({
              msg: 'server error'
            });
          });
      });
  });

};