const express = require('express')
const {index, store, update, destroy,show, twits} = require("../controllers/userController");
const router = express.Router();
const {validateUser} = require('../validators/user')
const {validateHandleError} = require('../middleware/auth')

router.get('/',index)
router.get('/get-one',show)
router.post('/',validateUser,validateHandleError,store)
router.put('/:id',update)
router.delete('/:id',destroy)
router.get('/me/twits',twits)
module.exports = router