// var express = require('express');
// var router = express.Router();
// const SpotName = require('../models/campaign');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   SpotName
//   // retireve all DP Locations
//   .find({})
//   .populate('_creator')
//   .exec((err, spotNames)=>{
//     res.render('index', {spotNames});
//   });
// });
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });

// module.exports = router;

var express = require('express');
var router = express.Router();
const NewLocation = require('../models/apiLocation-model');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    NewLocation
    // retireve all DP Locations
    .find({})
    .populate('_creator')
    .exec((err, spotNames)=>{
      res.render('index', {spotNames, 
        user: req.user});
    });
  } else {
    res.redirect('/signup')
  }
});


module.exports = router;
