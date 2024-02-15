const express = require('express')
const {registerController, loginController, logoutController, authController} = require('../controllers/userCtrl')
const router = express.Router()


const authMiddleware = require('../middleware/middleware')

router.post("/signup", registerController);

router.post('/signIn', loginController)

router.delete('/logout',authMiddleware, logoutController)

router.post('/getUserData', authMiddleware, authController)



module.exports = router;