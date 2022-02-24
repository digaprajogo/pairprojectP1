const express = require('express')
const router = express.Router();
const Controller = require('../controller/controller')
const profileRouter = require('./profile')


router.get('/', function (req, res) {
  res.redirect('/home')
})


router.get('/home', Controller.home)
router.get('/login', Controller.loginForm)
router.post('/login', Controller.postLogin)

router.get('/register', Controller.signUp)
router.post('/register', Controller.register)

router.use((req, res, next) => {
  console.log(req.session);
  if (!req.session.userId) {
    const error = 'Please Login First!'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})
router.get('/logout', Controller.logout)

router.use('/profile', profileRouter)

module.exports = router