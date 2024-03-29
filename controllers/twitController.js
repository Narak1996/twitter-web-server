const expressAsyncHandler = require('express-async-handler')
const {twitModel} = require("../models/twitModel");
const {decodeToken} = require("../helper/helper");
const {likeTwitModel} = require("../models/likeTwitModel");
const {commentTwitModel} = require("../models/commentTwitModel");

const index = expressAsyncHandler(async (req,res)=>{

    const twit = await twitModel.find().populate({path:'byUser',select:'profile_img name username'})
        .limit(50)
        .sort([['createdDate', 'desc']])
    return res.send(twit)


})

const store = expressAsyncHandler(async (req,res)=>{
    let obj = req.body
    const user = decodeToken(req.header('Authorization'))
    obj.byUser = user.id
    obj.image = user.profile_img
    obj.createdDate = new Date();

    const twit = new twitModel(req.body)
    await twit.save()
    res.send(twit)
})

const update = expressAsyncHandler(async (req,res)=>{
    const twit = await twitModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send(twit)
})

const destroy = expressAsyncHandler(async (req,res)=>{
    const twit = await twitModel.findByIdAndDelete(req.params.id)
    res.send(twit)
})
const show = expressAsyncHandler(async (req,res)=>{
    const twit = await twitModel.findOne({_id:req.params.id}).populate({path:'byUser',select:'profile_img name username'})
    res.send(twit)
})

const storeCommentTwit = expressAsyncHandler(async (req,res)=>{
    req.body.byUser = decodeToken(req.header('Authorization')).id
    req.body.twitId = req.params.id
    const comment = new commentTwitModel(req.body)
    await comment.save()
    const twit = await twitModel.findOne({_id:req.body.twitId})

    const up_twit = await twitModel.findOneAndUpdate({_id:req.body.twitId},{number_of_comments:(twit.number_of_comments+1)},{new:true})

    return res.send({comment,number_of_comments:up_twit.number_of_comments})
})
const getCommentTwit = expressAsyncHandler(async (req,res)=>{
    const comments = await commentTwitModel.find({byUser:decodeToken(req.header('Authorization')).id,twitId: req.params.id}).populate({path:'byUser',select:'profile_img name username'})
    return res.send(comments)

})

const storeReTwit = expressAsyncHandler(async (req,res)=>{
    let obj = req.body
    const user = decodeToken(req.header('Authorization'))
    obj.byUser = user.id
    obj.image = user.profile_img
    obj.createdDate = new Date();
    obj.repost_id = req.params.id;

    const re_twit = new twitModel(req.body)
    await re_twit.save()


    const twit = await twitModel.findOne({_id:obj.repost_id})
    const number_of_repost = twit.number_of_repost+1
    await twitModel.findOneAndUpdate({_id:obj.repost_id},{number_of_repost})

    return res.send({number_of_repost})
})

const likeTwit = expressAsyncHandler(async (req,res)=>{
    const user = decodeToken(req.header('Authorization'))

    const twit = await twitModel.findById(req.params.id)


    const my_param = {byUser:user.id,twitId:twit._id}

    const check_like = await likeTwitModel.find(my_param)

    let number_of_likes = twit.number_of_likes
    let liked = true
    if(check_like.length){
        number_of_likes--
        liked = false
        await likeTwitModel.deleteMany(my_param)
    }else{
        const likeTwit = new likeTwitModel(my_param)
        await likeTwit.save()

        number_of_likes++
    }
    const up_twit = await twitModel.findByIdAndUpdate(req.params.id,{number_of_likes},{new:true})



    res.json({number_of_likes:up_twit.number_of_likes,liked})
})
module.exports = {index,destroy,store,update,show,likeTwit,storeCommentTwit,getCommentTwit,storeReTwit}
