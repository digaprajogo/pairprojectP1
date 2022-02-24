const express = require('express')
const router = express.Router();
const Controller = require('../controller/controller')

// router.use((req, res, next) => {
//   console.log(req.session);
//     if (!req.session.userId) {
//       const error = 'Please Login First!'
//       res.redirect(`/login?error=${error}`)
//     } else {
//       next()
//     }
//   })

router.get('/:ProfileId', Controller.showProfile)
router.get('/:ProfileId/timeline', Controller.showTimeline)

router.get('/:ProfileId/edit', Controller.editProfileForm)
router.post('/:ProfileId/edit', Controller.editProfilePost)

router.get('/:ProfileId/addpost', Controller.addPostForm)
router.post('/:ProfileId/addpost', Controller.addPostPost)


router.get('/:ProfileId/delete/:PostId', Controller.deletePost)



module.exports = router