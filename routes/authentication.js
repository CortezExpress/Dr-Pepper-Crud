const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login')


// route setup - display login form 
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login');
});


// handle login
router.post('/login', ensureLoggedOut(), passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login'
}));


// handle signup form display
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup');
});
// handle submission of signup form
router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup'
}));

// handle logout of user
router.post('/logout', ensureLoggedIn('/login'),(req, res) => {
    req.logout();
    res.redirect('/');
})

//Auth - facebook configuariton
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/"
}));


module.exports = router;



