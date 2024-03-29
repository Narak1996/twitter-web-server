const {checkSchema} = require('express-validator')
const {userModel} = require("../models/userModel");
const bcrypt = require('bcrypt')

const loginValidate = checkSchema({
    username:{
        notEmpty:true,
        errorMessage:'Username is required'
    },
    password:{
        notEmpty:true,
        errorMessage:'Password is required',
        custom:{
            options:async (value, {req})=>{
                const user = await userModel.findOne({username:req.body.username})
                if(!user) throw new Error("User is not registered!")

                const checkPassword = await bcrypt.compare(value, user.password)
                if(!checkPassword) throw new Error("Username or password is incorrect!")

            }
        }
    }
})

module.exports = {loginValidate}