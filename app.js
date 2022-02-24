const express = require('express')
const app = express()
// const routers = require('./routes/mainpage')
const Controller = require('./controller/controller')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));



app.get('/', Controller.signUp)
app.post('/register', Controller.register)

app.get('/login', Controller.loginForm)
app.post('/login', Controller.postLogin)

// app.get('/', (req, res) => {
//   res.render('test')
// })

app.get('/profile/:ProfileId', Controller.showProfile)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


