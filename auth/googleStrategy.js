var GoogleStrategy = require('passport-google-oauth2').Strategy;
const passport = require('passport')
const {ifEmailExist, signToken} = require("../helper/helper");
const {userModel} = require("../models/userModel");
require('dotenv').config()

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALL_BACK,
        passReqToCallback: true
    },
    async function (request, accessToken, refreshToken, profile, done) {
        let auth_user = await ifEmailExist(profile.email)
        let token = '';
        if (auth_user) {
            token = signToken(auth_user)
        }else{
            auth_user = new userModel({
                profile_type: 'google',
                username: profile.email,
                email: profile.email,
                name: profile.displayName,
                profile_img: profile.photos[0].value,
                googleId: profile.id
            })
            const result = await auth_user.save();
            token = signToken(result)
        }
        return done(null, {token});
    }
));
passport.serializeUser((auth_user, done) => {
    done(null, auth_user)
})
passport.deserializeUser((auth_user, done) => {
    done(null, auth_user)
})