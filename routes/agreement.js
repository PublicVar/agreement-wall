const express = require('express');
const router = express.Router();
const db = require('../database/db');
const People = require('../services/people');
const AssertionError = require('chai').AssertionError;

router.post('/sign-in', function(req, res, next) {
  try {
    People.create(req.body);
  } catch (AssertionError) {
    res.status(400).send('Formulaire invalide');
  }

  let sql =  'INSERT INTO `people` SET ?';
  let people = {};

  db.query(sql, people, (error, results, fields) => {
    if (error) throw error;
    res.status(200).send('souscrire');
  })
});

module.exports = router;
