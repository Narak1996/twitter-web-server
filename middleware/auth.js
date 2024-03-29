const {validationResult} = require('express-validator')
const expressAsyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken')

const validateHandleError = async (req, res, next) => {
    const result = validationResult(req)
    if (result.isEmpty()) {
        next()
    } else {
        return res.send({error: result.array()})
    }
}

const auth = expressAsyncHandler(async (req,res,next)=>{
    let token = req.header('Authorization')
    if(!token) res.status(401).json({error:"Access denied"})

    token = token.replace("Bearer ", "")
    const decode = jwt.verify(token,process.env.SECRET)

    if(decode) return next()

    throw new Error("token is invalid")
})

module.exports = {auth, validateHandleError}