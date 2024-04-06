const mongoose = require('mongoose')
const schema = mongoose.Schema

const userSchema = new schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true},
    profile_type:{type:String,required:true},
    googleId:{type:String},
    dob:Date,
    username:{type:String,required: true,unique: true},
    location:{type:String},
    bio:{type:String},
    password:String,
    profile_img:String,
    followings:[{type:mongoose.Types.ObjectId,ref:'User'}],
    followers:[{type:mongoose.Types.ObjectId,ref:'User'}],
    twits:[{type:mongoose.Types.ObjectId,ref:'Twit'}],
})


const userModel = mongoose.model('User',userSchema)

module.exports = {userSchema,userModel}