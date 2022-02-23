const express = require('express')
const router = express.Router();
const Controller = require('../controller/controller')
const profileRouter = require('./profile/:profileId')
const postsRouter = require('./posts')

router.get('/', function(req, res){
    res.send('this is log in form')
})
router.get('/register', Controller.signUp)
router.post('/register', function(req, res){
    res.send('post')
})

router.use('/profile', profileRouter)
router.use('/posts', postsRouter)

module.exports = router