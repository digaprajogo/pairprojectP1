const express = require('express')
const app = express()
// const routers = require('./routes/mainpage')
const Controller = require('./controller/controller')
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'));



app.get('/', Controller.signUp)
app.post('/register', Controller.register)

// app.get('/', (req, res) => {
//   res.render('test')
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


