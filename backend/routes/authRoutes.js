const authCont = require('../controllers/authController')
const router = require('express').Router()


router.post('/register' , authCont.register)
router.post('/login' , authCont.login)

module.exports = router