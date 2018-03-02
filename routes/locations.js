const express  = require('express');
const DPSpot = require('../models/apiLocation-model');
// const TYPES    = require('../models/soda-types');
const router   = express.Router();
const { ensureLoggedIn }  = require('connect-ensure-login');
var ObjectId = require('mongoose').Types.ObjectId; 

// display form to add DP location
// below is when soda types are implamented
// router.get('/new', (req, res) => {
//     res.render('campaigns/new', { types: TYPES });
//   });
router.get('/new',ensureLoggedIn('/login'), (req, res) => {
    res.render('locations/new');
  });

// creation of the location with google places api
router.post('/', ensureLoggedIn('/login'), (req, res, next) =>{
    const newLocation = new DPSpot({
      spotName: req.body.spotName,
      street_number: req.body.street_number,
      route: req.body.route,
      city: req.body.city,
      state: req.body.state,
      postal_code: req.body.street_number,
      country: req.body.street_number,
      description: req.body.description,
        //   category: req.body.category,
      // If no user is logged in, this will throw an error
      _creator: req.user._id
    });


  // creation of the location
  // router.post('/', ensureLoggedIn('/login'), (req, res, next) =>{
  //   const newLocation = new DPSpot({
  //     spotName: req.body.spotName,
  //     address: req.body.address,
  //     description: req.body.description,
  //       //   category: req.body.category,
  //     // If no user is logged in, this will throw an error
  //     _creator: req.user._id
  //   });

    console.log("newLocation", newLocation)
    newLocation.save((err) => {
      if(err){
        res.render('locations/new');
      }
      res.redirect('/locations');
    })
  })

  // list all my locations

  router.get('/', ensureLoggedIn('/login'),  (req, res, next) => {
    DPSpot.find({}, (err, listOfLocations) => {
      if(err){
        next(err);
        return;
      }
      console.log("listOfLocations", listOfLocations)
      res.render('index', {
        spotNames: listOfLocations
      })
    })
  })

  // let's handle the search by city
  router.get('/search', (req, res, next) => {
    const searchTerm = req.query.locationSearchTerm;
  
    if (!searchTerm) {
      res.render('locations/search-views');
      return;
    }
  
    const searchRegex = new RegExp(searchTerm, 'i');
  
    DPSpot.find(
      { city: searchRegex },
      (err, searchResults) => {
        if (err) {
          next(err);
          return;
        }
  
        res.render('locations/search-views', {
          locations: searchResults
        });

        // res.send("test");
      }
    );
  });

// display edit location information
router.get('/:id/edit', ensureLoggedIn('/login'), (req, res, next) => {
  DPSpot.findById(req.params.id, (err, location) => {
  
  // DPSpot.find({_creator: req.params.id}, (err, location) => {
    if (err)       { return next(err) }
    if (!location) { return next(new Error("404")) }
    return res.render('locations/edit', {
      location: location
    })
  });
});

router.post('/:id', ensureLoggedIn('/login'), (req, res, next) =>{
  const DPSpotId = req.params.id

  const updates = {
    spotName: req.body.spotName,
    street_number: req.body.street_number,
    route: req.body.route,
    city: req.body.city,
    state: req.body.state,
    postal_code: req.body.street_number,
    country: req.body.street_number,
    description: req.body.description,
    _creator: req.user._id
  };
  // console.log("DPSpotId", DPSpotId )
  // console.log("updates", updates)
  DPSpot.findByIdAndUpdate(DPSpotId, updates, (err, location) =>{
    if (err)       { return next(err) }
    res.redirect('/');
  })
});

  // delete
  router.post('/:id/delete', ensureLoggedIn('/login'), (req, res, next) =>{
    const DPSpotId = req.params.id
      DPSpot.findByIdAndRemove(DPSpotId, (err) =>{
        if (err)       { return next(err) }
        res.redirect('/')
      })
  })

module.exports = router;

