const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
/* const cors = require('cors') */

const router = express.Router();

/* router.options('/login', cors()) */

/* router.options('/login', cors()) */

router.post('/signup', authController.signup) // signup solo tiene sentido para post
router.post('/login', authController.login)

router.get('/logout', authController.logout)


router.post('/forgotPassword', authController.forgotPassword)

router.patch('/resetPassword/:token', authController.resetPassword)

//Protect all routes after this middleware
router.use(authController.protect)

router
.patch('/updateMyPassword/', authController.updatePassword)

router.patch('/updateMe', userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe) // photo porq es el name del field del form en el que se sube la foto

router.delete('/deleteMe', userController.deleteMe)

router.get('/me', userController.getMe, userController.getUser)

router.use(authController.restrictTo('admin'))

router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser)

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser)

module.exports = router;