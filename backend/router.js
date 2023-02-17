const express = require('express')
const router = express.Router()
const loginController = require('./controller/login.js')
const registerController = require('./controller/register.js')

router.post('/login', loginController)
router.post('/register', registerController)

module.exports = router;