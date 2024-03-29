const {userModel} = require('../models/userModel')
const { checkSchema } = require("express-validator")

const validateUser = checkSchema({
    name:{
      isLength:{
          options:{
              min:4,
              max:60
          },
          errorMessage:"min 4 , max 10"
      }
    },
    username: {
        isLength: {
            options: {
                max: 20,
                min: 3
            },
            errorMessage: "Username's length must be 20 max and 3 min characters."
        }
    },
    email:{
        isEmail:true,
        errorMessage:"Email is invalid",
        custom:{
            options:async email=>{
                const existedUser = await userModel.find({email})

                if(existedUser.length){
                    throw new Error("Email already existed!")
                }
            }
        }

    },
    password:{
        isLength:{
            options:{
                min:3,
                max:50
            },
            errorMessage:"Password must >3 and <50 character !"
        }
    },
    confirm_password:{
        isLength:{
            options:{
                min:3,
                max:50
            },
            errorMessage:"Password must >3 and <50 character !"
        },
        custom:{
            options:async (value,{req})=>{
                if(value!=req.body.password){
                    throw new Error("Confirm password not match")
                }
            }
        }
    }
})

module.exports = {validateUser}