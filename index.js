const express = require('express')
const app = express()
const port = 3000
const userRoute = require('./routes/user')
const twitRoute = require("./routes/twit");
const authRoute = require("./routes/auth");
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConnect = require("./db/db-connect")
const passport = require('passport')
const session = require('express-session')

require('dotenv').config()
var morgan = require('morgan')
const {auth} = require("./middleware/auth");
const {jwtStrategy} = require("./auth/jwtStrategy");
const {userModel} = require("./models/userModel");
dbConnect().catch((err)=>{
    console.log(err)
})
passport.use(jwtStrategy)

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session({
    secret: 'express-session-secret'
}))
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/auth/',authRoute)
app.use('/api/users/',passport.authenticate('jwt',{session:false}),userRoute)
app.use('/api/twits/',passport.authenticate('jwt', { session: false }),twitRoute)
app.use('/api/check-connection/',async function (req,res) {
    try {
        const user = await userModel.find().limit(1)
        res.send({status:'200',db_check:user.length})
    }
    catch (e) {
        res.send({status:'500',msg:'error db'})
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})