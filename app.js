const express = require('express')
const app = express()
const routers = require('./routes/index')
const Controller = require('./controller/controller')
const port = process.env.PORT || 3000;
const session = require('express-session')
const { eventNames } = require('geolocation')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));


app.use(session({
  secret: 'SOCMED',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(routers)
// app.get('/', function(req, res){
//   res.redirect('/home')
// })
// app.get('/home', Controller.home)
// app.get('/login', Controller.loginForm)
// app.post('/login', Controller.postLogin)

// app.get('/register', Controller.signUp)
// app.post('/register', Controller.register)

// app.use((req, res, next) => {
//   console.log(req.session);
//   if (!req.session.userId) {
//     const error = 'Please Login First!'
//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })

// app.get('/profile/:ProfileId', Controller.showProfile)
// app.get('/profile/:ProfileId/timeline', Controller.showTimeline)

// app.get('/profile/:ProfileId/edit', Controller.editProfileForm)
// app.post('/profile/:ProfileId/edit', Controller.editProfilePost)

// app.get('/profile/:ProfileId/addpost', Controller.addPostForm)
// app.post('/profile/:ProfileId/addpost', Controller.addPostPost)

// app.get('/profile/:ProfileId/delete/:PostId', Controller.deletePost)

// app.get('/logout', Controller.logout)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


