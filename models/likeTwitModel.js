const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    twitId: {type: mongoose.Types.ObjectId, ref: 'Twit'},
    byUser: {type: mongoose.Types.ObjectId, ref: 'User'}
})

const likeTwitModel = mongoose.model('LikeTwit', likeSchema)
module.exports = {likeTwitModel}