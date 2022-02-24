const { Profile, User, Post } = require('../models')
const bcrypt = require('bcryptjs')
// const geolocation = require('geolocation')



class Controller {
    static signUp(req, res) {
        res.render('registerForm')
    }

    static register(req, res) {
        const { userName, email, password, firstName, lastName, bio, profileUrl } = req.body
        const dataUser = { userName, email, password }
        User.create(dataUser)
            .then(function (data) {
                console.log(data, 'ATAS');
                const UserId = data.id
                let dataProfile = { firstName, lastName, bio, profileUrl, UserId }
                return Profile.create(dataProfile)
            })
            .then(function (data2) {
                console.log(data2, 'BAWAH')
                res.redirect('/')
            })
            .catch(function (err) {
                res.send(err)
            })
    }

    static showProfile(req, res) {
        const { ProfileId } = req.params
        Profile.findByPk(ProfileId, { include: [Post, User] })
            .then(result => {
                // console.log(result);
                res.render('showprofile', { result })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static loginForm(req, res) {
        const errorFound = req.query.error
        res.render('loginForm', {errorFound})
    }

    static postLogin(req, res){
        const { userName, password } = req.body
        User.findOne({where: {userName}})
        .then(function(data){
            if(data){
                const validatePasword = bcrypt.compareSync(password, data.password);
                if(validatePasword) return res.redirect('/')
                else {
                    const error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = 'invalid username/password'
                return res.redirect(`/login?error=${error}`)
            }
        })
        .catch(function(err){
            res.send(err)
        })
    }

    static editForm(req, res)
}

module.exports = Controller