const { Profile, User } = require('../models')

class Controller {
    static signUp(req, res){
        res.render('registerForm')
    }

    static register(req, res){
        const {userName, email, password, firstName, lastName, bio, profileUrl} = req.body
        const dataUser = {userName, email, password} 
        User.create(dataUser)
        // .then(function(data){
        //     let dataProfile = {firstName, lastName, bio, profileUrl, data}
        //     return Profile.create(dataProfile)
        // })
        .then(function(data2){
            console.log(data2)
            res.redirect('/')
        })
        .catch(function(err){
            res.send(err)
        })
    }
}

module.exports = Controller