const expressAsyncHandler = require("express-async-handler");
const {userModel} = require("../models/userModel");
const bcrypt = require('bcrypt')
const {signToken, decodeToken} = require("../helper/helper");
const jwt = require('jsonwebtoken')
const {twitModel} = require("../models/twitModel");

exports.index = expressAsyncHandler(async (req, res) => {
    const user = await userModel.find()
    res.send(user)
})
exports.show = expressAsyncHandler(async (req, res) => {
    let payload =decodeToken(req.header('Authorization'))
    const user = await userModel.findById(payload.id)
    res.send(user)
})
exports.twits = expressAsyncHandler (async (req,res)=>{
    let auth = decodeToken(req.header('Authorization'))
    const twit = await (twitModel.find({byUser: auth.id})).populate({path:'byUser',select:'name username profile_img'}).sort({createdDate:'desc'});
    res.json(twit)
})
exports.store = expressAsyncHandler(async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    req.body.profile_type = 'normal'
    req.body.profile_img = 'https://source.unsplash.com/random/64x64?random-girl'

    const user = new userModel(req.body)


    await user.save()

    const token = signToken(user)

    return res.status(200).json({token})
})
exports.update = expressAsyncHandler(async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send(user)
})
exports.destroy = expressAsyncHandler(async (req,res)=>{
    const del = await userModel.findByIdAndDelete(req.params.id)
    res.send(del)
})