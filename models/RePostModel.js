const mongoose = require('mongoose')

const repostSchema = new mongoose.Schema({
    byUser:{type:mongoose.Types.ObjectId,ref:'users'},
    twitId:{type: mongoose.Types.ObjectId,ref:'twits'},
    repostId:{type:mongoose.Types.ObjectId,ref:'twits'}
})

const repostModel = mongoose.model('repostModel',repostSchema)

module.exports = {repostModel}