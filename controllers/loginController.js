const expressAsyncHandler = require('express-async-handler')
const {userModel} = require("../models/userModel");
const {signToken, ifEmailExist} = require("../helper/helper");
const axios = require("axios");

const login = expressAsyncHandler(async (req, res) => {
    const user = await userModel.findOne({username: req.body.username})
    const token = signToken(user)
    res.status(200).json({token})
})

const loginWithGoogle = (expressAsyncHandler(async (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT}&response_type=code&scope=profile`
    // Show OAuth2.0 Consent Dialog
    res.redirect(url)
}))
const googleCallback = (async (req, res) => {
    const code = req.query.code
    const { data } = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.GOOGLE_CALLBACK,
        grant_type: "authorization_code"
    })
    const {access_token,id_token} = data
    console.log(access_token,id_token)

    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${access_token}` }
    })
    const userprofile = response.data
    // Check if user exist in database
    if (await ifEmailExist(userprofile.email)) {
        const user = await userModel.findOne({ email: userprofile.email })
        const token = signToken(user)
        return res.json({ token: token })
    }
    //Register user in our database
    const newUser = new userModel({
        username: userprofile.email,
        email: userprofile.email,
        type: 'sso'
    })
    const result = await newUser.save()
    const token = signToken(result)
    return res.json({ token: token })
})

module.exports = {login,loginWithGoogle,googleCallback}