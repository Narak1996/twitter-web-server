const mongoose = require('mongoose')
require('dotenv').config()
async function dbConnect() {
    mongoose.connection.on('connected',()=>{console.log('connected!!')})
    mongoose.connection.on('open',()=>{console.log('open!!')})
    await mongoose.connect(process.env.MONGO_DB_ATLAS,{
        dbName:'twitterdb'
    })

}
module.exports = dbConnect