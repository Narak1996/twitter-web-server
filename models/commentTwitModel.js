const mongoose = require('mongoose')

const commentTwitSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'User'},
    twitId:{type: mongoose.Types.ObjectId,ref:'Twit'},
    comment:{type:String,require:true}
})

const commentTwitModel = mongoose.model('commentTwit',commentTwitSchema)
module.exports = {commentTwitModel}