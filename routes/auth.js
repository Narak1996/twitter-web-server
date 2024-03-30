const express = require('express')
const passport = require('passport')
const {login, loginWithGoogle, googleCallback} = require("../controllers/loginController");
const {loginValidate} = require("../validators/auth");
const {validateHandleError} = require("../middleware/auth");
const router = express.Router()
require('../auth/googleStrategy')
const {validateUser} = require("../validators/user");
const {store} = require("../controllers/userController");


router.post('/login', loginValidate, validateHandleError, login)

router.post('/register',validateUser,validateHandleError,store)

router.get('/google-login',passport.authenticate('google', {scope:['email', 'profile']}));
router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/auth/redirect-to-frontend',
        failureRedirect: 'api/auth/google/failure'
    }));


router.get('/redirect-to-frontend',function (req,res) {
   return res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.token}`)
})
router.get('/google/failure',function (req,res) {
    res.send('failure')
})

// router.get('/show-auth', loginWithGoogle) // show auth screen
// router.get('/google/callback', googleCallback) // show auth screen

module.exports = router