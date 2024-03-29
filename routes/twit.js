const express = require('express')
const router = express.Router()
const {index, store, update, destroy,likeTwit,getCommentTwit,storeCommentTwit,show,storeReTwit} = require('../controllers/twitController')

router.get('/',index)
router.post('/',store)

router.get('/:id',show)
router.put('/:id',update)
router.delete('/:id',destroy)

router.post('/:id/like',likeTwit)

router.post('/:id/repost',storeReTwit)

router.post('/:id/comment',storeCommentTwit)
router.get('/:id/comment',getCommentTwit)


module.exports = router