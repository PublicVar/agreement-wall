const express = require('express');
const router = express.Router();
const PeopleDB = require('../database/peopleDb');
router.get('/', function(req, res, next) {

  PeopleDB.getAgreedPeople((err, results)=>{
    res.render('index', { title: 'Express', csrf: req.csrfToken(), agreedPeople: results });
  });
  
});

module.exports = router;
