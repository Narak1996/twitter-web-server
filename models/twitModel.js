const mongoose = require("mongoose")
const {tr} = require("@faker-js/faker");
const path = require('path')

const likeSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'User'},
    createdDate:{type: Date,default:()=>new Date()}
})
const commentSchema = new mongoose.Schema({
    text:{type:String,required: true},
    byUser:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    createdDate:{type:Date,default:()=>new Date(),immutable:true}
})
const repostSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    twitId:{type:mongoose.Types.ObjectId,ref:'Twit',required:true},
    createdDate:{type:Date,default:()=>new Date()}
})
const twitSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'User'},
    text:{type: String,required:true},
    image:{type: String},
    repost_id:{type: mongoose.Types.ObjectId,ref:'Twit'},

    likes:[likeSchema],
    comments:[commentSchema],
    reposts:[repostSchema],

    number_of_likes:{type: Number,default:0},
    number_of_comments:{type: Number,default:0},
    number_of_repost:{type: Number,default:0},
    createdDate:{type:Date,default: Date.now}
},{toJSON:{virtuals:true}})


// twitSchema.virtual('imageUrl').get(function() {
//     return path.resolve(this.image)
// })

const twitModel = mongoose.model('Twit',twitSchema)

module.exports = {twitSchema,twitModel}