const mongoose = require('mongoose')

const commentTwitSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'users'},
    twitId:{type: mongoose.Types.ObjectId,ref:'twits'},
    comment:{type:String,require:true}
})

const commentTwitModel = mongoose.model('comment_twit',commentTwitSchema)
module.exports = {commentTwitModel}