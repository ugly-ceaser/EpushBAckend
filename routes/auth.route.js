const { handleSignUp,checkUser,loginHandler, initialDeposit } = require('../controller/auth.controller');

const router = require('express').Router();

//auth

router.post('/login', loginHandler)// to login user
router.post('/check',checkUser) //used
router.post('/proceed', initialDeposit) //handle initial user deposit
router.post('/complete', handleSignUp) // register user  to the database





module.exports = router