var express = require('express');
var router = express.Router();
var config = require('../config');
var connect = require('../utils/sqlConnect');
var bodyParser = require('body-parser');

// do some checking here => check the default user profile
// ternary statement => MDN ternary
var toRender = (config.kidsmode) ? 'main_kids' : 'home';

/* GET home page. */
router.get('/', (req, res) => {
  connect.query('SELECT * FROM tbl_content WHERE con_section="home"', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

  res.render('home', {
    title: 'Roku',
    // message : "handlebars is awesome",
    mainpage : true,
    // cms : false,
    kidsmode : config.kidsmode,
    index : result
  });
}
});
});

/* GET home page. */
router.get('/kids', (req, res) => {
  connect.query('SELECT * FROM tbl_content WHERE con_section="kids"', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

  res.render('main_kids', {
    title: 'Roku',
    mainpage : true,
    kidsmode : config.kidsmode,
    index : result
  });
}
});
});

/* GET home page. */
router.get('/parents', (req, res) => {
  connect.query('SELECT * FROM tbl_content WHERE con_section="parents"', (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

  res.render('parents', {
    title: 'Roku',
    mainpage : true,
    kidsmode : config.kidsmode,
    index : result
  });
}
});
});

/* GET content page. */
router.get('/details/:id', (req, res) => {
  let id = req.params.id;
  connect.query('SELECT * FROM tbl_content WHERE con_id='+id, (err, result) => {
    if (err) {
      throw err; console.log(err);
    } else {
      console.log(result);

      res.render('details', {
        title: 'Roku',
        // message : "A Selection of Minis",
        details : result
      });
    }
  });
});

module.exports = router;
