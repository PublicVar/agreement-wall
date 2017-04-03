const express = require('express');
const router = express.Router();

const logger = require('../services/logger/logger');
const People = require('../services/people');
const PeopleDB = require('../database/peopleDb');
const AssertionError = require('chai').AssertionError;
const Mailer = require('../services/mailer/mailer');


router.post('/sign-in', function (req, res, next) {

  let people = new People();
  try {
    people.importData(req.body);
  } catch (AssertionError) {
    return res.status(400).send(AssertionError);
  }

  PeopleDB.save(people, (error, results, fields) => {
    if (error) {
      logger.log('error','Save People Error :'+error.message, {error});
      res.status(400).render('agreement', {
        error
      });
    } else {
      Mailer.sendConfirmOptIn(people.email,req.headers.host, people.hash);
      res.render('agreement');
    }

  });
});

router.get('/opt-in/:hash', function (req, res, next) {
  const hash = req.params.hash;
  const ip = req.ip;
  PeopleDB.getIdByHash(hash, (error, results, fields) => {
    if (results.length <= 0) {
      error = "Hash not valid"
      logger.log('error',"Optin Error : "+error);
    }
    if (error) {
      logger.log('error','Optin Error ', error);
      res.render('opted-in', {
        error
      });
    } else {
      PeopleDB.setOptedIn(results[0].id,ip);
      res.render('opted-in');
    }
  });
});
module.exports = router;