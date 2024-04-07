const express = require('express')
const router = express.Router()
const {index, store, update, destroy,likeTwit,getCommentTwit,storeCommentTwit,show,storeReTwit} = require('../controllers/twitController')

const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'./uploads/'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, (`${file.fieldname}-${uniqueSuffix}.png`))
    }
})
const upload = multer({storage:storage})

router.get('/',index)
router.post('/',upload.single('image'),store)

router.get('/:id',show)
router.put('/:id',update)
router.delete('/:id',destroy)

router.post('/:id/like',likeTwit)

router.post('/:id/repost',storeReTwit)

router.post('/:id/comment',storeCommentTwit)
router.get('/:id/comment',getCommentTwit)




module.exports = router