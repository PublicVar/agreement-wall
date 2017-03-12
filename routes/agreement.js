var express = require('express');
var router = express.Router();
var db = require('../database/db');

router.post('/sign-in', function(req, res, next) {

  let sql =  'INSERT INTO `people` SET ?';
  let people = {};

  db.query(sql, people, (error, results, fields) => {
    if (error) throw error;
    res.send('souscrire');
  })
});

module.exports = router;
