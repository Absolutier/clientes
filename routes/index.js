var express = require('express');
var router = express.Router();
let fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readFile('public/dist/index.html', 'utf8', function(err, data){
    if(err){
      return console.log(err);
    }
    res.render('index', { content: data});
  })
});

module.exports = router;
