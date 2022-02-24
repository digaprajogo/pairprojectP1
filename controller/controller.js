const { Profile, User } = require('../models')

class Controller {
    static signUp(req, res){
        res.render('registerForm')
    }

    static register(req, res){
        const {userName, email, password, firstName, lastName, bio, profileUrl} = req.body
        const dataUser = {userName, email, password} 
        User.create(dataUser)
        .then(function(data){
            console.log(data, 'ATAS');
            const UserId = data.id
            let dataProfile = {firstName, lastName, bio, profileUrl, UserId}
            return Profile.create(dataProfile)
        })
        .then(function(data2){
            console.log(data2, 'BAWAH')
            res.redirect('/')
        })
        .catch(function(err){
            res.send(err)
        })
    }
}

module.exports = Controller