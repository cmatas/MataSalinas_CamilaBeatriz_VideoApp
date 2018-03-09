var express = require('express');
var router = express.Router();
var config = require('../config');
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');

// do some checking here => check the default user profile
// ternary statement => MDN ternary
var toRender = (config.kidsmode) ? 'main_kids' : 'home';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Roku',
    message : "handlebars is awesome",
    mainpage : true,
    cms : false,
    kidsmode : config.kidsmode
  });
});

/* GET home page. */
router.get('/kids', function(req, res, next) {
  res.render('main_kids', {
    title: 'Roku',
    message : "handlebars is awesome",
    mainpage : true,
    cms : false,
    kidsmode : config.kidsmode
  });
});

/* GET home page. */
router.get('/parents', function(req, res, next) {
  res.render('parents', {
    title: 'Roku',
    message : "handlebars is awesome",
    mainpage : true,
    cms : false,
    kidsmode : config.kidsmode
  });
});

router.get('/cms', (req, res) => { //cause cms is here
  console.log('hit the menu route');
  res.render('cmsForm', {
    // menu : false,
    mainpage : false
  });
})

/* GET content page. */
router.get('api/:id', (req, res) => {
  connect.query('SELECT * FROM tbl_content', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

      res.render('home', {
        title: 'Mini Cars',
        message : "A Selection of Minis",
        index : result
      });
    }
  });
});

module.exports = router;
