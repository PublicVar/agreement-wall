const express = require('express');
const router = express.Router();
const db = require('../database/db');
const People = require('../services/people');
const AssertionError = require('chai').AssertionError;


router.post('/sign-in', function(req, res, next) {

  let people = new People();
  try {
    people.importData(req.body);
  } catch (AssertionError) {
    return res.status(400).send(AssertionError);  
  }

  //insert in database
  let sql =  'INSERT INTO `people` SET ?';

  db.query(sql, people, (error, results, fields) => {
    if (error){
      return res.status(500).send('Echec inscription');
    } 
    return res.status(200).send('agree');
  })

});

module.exports = router;
