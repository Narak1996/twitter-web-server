const jwt = require("jsonwebtoken");
const {userModel} = require("../models/userModel");

const signToken = (user)=>{
    return jwt.sign({
        id:user._id,
        name:user.name,
        username:user.username,
        email:user.email,
        profile_img:user.profile_img
    },process.env.SECRET,{
        expiresIn: '24h',
        issuer: 'api.tfdevs.com',
        audience: 'www.tfdevs.com'
    })
}
const ifEmailExist = async (email)=>{
    return userModel.findOne({email});
}

const decodeToken = (token)=>{
    return jwt.decode(token.replace('Bearer ',''))
}
module.exports = {signToken,ifEmailExist,decodeToken}
