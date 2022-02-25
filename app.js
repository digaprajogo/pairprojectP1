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

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


