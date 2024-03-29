const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    twitId: {type: mongoose.Types.ObjectId, ref: 'twits'},
    byUser: {type: mongoose.Types.ObjectId, ref: 'users'}
})

const likeTwitModel = mongoose.model('like_twit', likeSchema)
module.exports = {likeTwitModel}