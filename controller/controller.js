const { Profile, User, Post, Tag, Poststag } = require('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");
const formatDate = require('../helper/formatDate');
// const geolocation = require('geolocation')


class Controller {

    static home(req, res) {
        res.render('home')
    }

    static logout(req, res) {
        req.session.destroy((error) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect('/')
            }
        })
    }


    static signUp(req, res) {
        const foundErrors = req.query.error
        let errors = foundErrors ? foundErrors.split(';') : undefined
        res.render('registerForm', { errors })
    }

    static register(req, res) {
        //Transaction untuk antisipasi validasi ini.
        const { userName, email, password, firstName, lastName, bio, profileUrl } = req.body
        const dataUser = { userName, email, password }
        User.create(dataUser)
            .then(function (data) {

                const UserId = data.id
                let dataProfile = { firstName, lastName, bio, profileUrl, UserId }
                return Profile.create(dataProfile)
            })
            .then(function (data2) {
                res.redirect('/login')
            })
            .catch(function (err) {
                let foundErrors = []
                for (let i = 0; i < err.errors.length; i++) {
                    foundErrors.push(err.errors[i].message)
                }
                res.redirect(`/register?error=${foundErrors.join(';')}`)
            })
    }

    static showProfile(req, res) {
        let data1
        let data2
        const { ProfileId } = req.params
        Profile.findByPk(ProfileId, { include: [Post, User] })
            .then(result1 => {
                data1 = result1
                return Post.findAll({
                    where: {
                        ProfileId
                    },
                    include: [Tag]
                })
            })
            .then(result2 => {
                data2 = result2
                res.render('showprofile', { data1, data2, formatDate })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static showTimeline(req, res) {
        let queryString
        if (!req.query.search) {
            queryString = ''
        } else {
            queryString = req.query.search
        }
        let data1
        let data2
        const { ProfileId } = req.params
        Profile.findByPk(ProfileId, { include: [Post, User] })
            .then(result1 => {
                data1 = result1
                return Post.findAll({
                    include: [Profile, Tag],
                    where: {
                        title: {
                            [Op.iLike]: `%${queryString}%`
                        }
                    }
                })
            })
            .then(result2 => {
                data2 = result2
                res.render('showTimeline', { data1, data2, formatDate })
            })
            .catch(error => {
                res.send(error)
            })

    }

    static loginForm(req, res) {
        const errorFound = req.query.error
        res.render('loginForm', { errorFound })
    }

    static postLogin(req, res) {
        const { userName, password } = req.body
        User.findOne({ where: { userName } })
            .then(function (data) {
                if (data) {
                    const validatePasword = bcrypt.compareSync(password, data.password);
                    if (validatePasword || password === data.password) {
                        req.session.userId = data.id
                        return res.redirect(`/profile/${data.id}`)
                    } else {
                        const error = 'invalid username/password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(function (err) {
                res.send(err)
            })
    }

    static editProfileForm(req, res) {
        const foundErrors = req.query.error
        let errors = foundErrors ? foundErrors.split(';') : undefined
        Profile.findOne({
            where: {
                id: +req.params.ProfileId
            }
        })
            .then(function (data) {
                res.render('editProfileForm', { data, errors })
            })
            .catch(function (err) {
                res.send(err)
            })
    }

    static editProfilePost(req, res) {
        let UserId = +req.params.ProfileId
        const { firstName, lastName, bio, profileUrl } = req.body
        const dataProfile = { firstName, lastName, bio, profileUrl, UserId }
        Profile.update(dataProfile, {
            where: {
                id: UserId
            }
        })
            .then(function () {
                res.redirect(`/profile/${UserId}`)
            })
            .catch(function (err) {
                let foundErrors = []
                for (let i = 0; i < err.errors.length; i++) {
                    foundErrors.push(err.errors[i].message)
                }
                res.redirect(`/profile/${UserId}/edit?error=${foundErrors.join(';')}`)
            })
    }

    static addPostForm(req, res) {
        let data1
        let data2
        const { ProfileId } = req.params
        Profile.findByPk(ProfileId, { include: [Post, User] })
            .then(result1 => {
                data1 = result1
                return Tag.findAll()
            })
            .then(result2 => {
                data2 = result2
                res.render('addPostForm', { data1, data2 })
            })
            .catch(error => {
                res.send(error)
            })
    }

    static addPostPost(req, res) {
        const ProfileId = +req.params.ProfileId
        let TagId = +req.body.TagId
        const { title, postUrl, caption } = req.body
        const dataPost = { title, postUrl, caption, ProfileId }
        Post.create(dataPost)
            .then(function (data) {
                let PostId = data.id
                let title = data.title
                const dataPostTag = { title, PostId, TagId }
                return Poststag.create(dataPostTag)
            })
            .then(function () {
                res.redirect(`/profile/${ProfileId}`)
            })
            .catch(function (err) {
                res.send(err)
            })
    }


    static deletePost(req, res) {
        const ProfileId = +req.params.ProfileId
        Post.destroy({
            where: {
                id: +req.params.PostId
            }
        })
            .then(function () {
                res.redirect(`/profile/${ProfileId}`)
            })
            .catch(function (err) {
                res.send(err)
            })
    }

}

module.exports = Controller