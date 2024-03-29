const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {userModel} = require("../models/userModel")

const jwtStrategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
    issuer: 'api.tfdevs.com',
    audience: 'www.tfdevs.com'
}, async function (jwt_payload, done) {
    const user = await userModel.findOne({_id: jwt_payload.id})
    if (user) return done(null, user)

    done(null, false)
})
module.exports = {jwtStrategy}