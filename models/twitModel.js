const mongoose = require("mongoose")

const twitSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'users'},
    text:{type: String,required:true},
    image:{type: String},
    repost_id:{type: mongoose.Types.ObjectId,ref:'twits'},

    number_of_likes:{type: Number,default:0},
    number_of_comments:{type: Number,default:0},
    number_of_repost:{type: Number,default:0},

    createdDate:{type:Date,required: true}
})

const twitModel = mongoose.model('twits',twitSchema)

module.exports = {twitSchema,twitModel}