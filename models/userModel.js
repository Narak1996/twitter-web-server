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
    followings:[{type:mongoose.Types.ObjectId,ref:'users'}],
    followers:[{type:mongoose.Types.ObjectId,ref:'users'}],
    twits:[{type:mongoose.Types.ObjectId,ref:'twits'}],
})


const userModel = mongoose.model('users',userSchema)

module.exports = {userSchema,userModel}