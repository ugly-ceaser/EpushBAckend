const {  handleSignUp,initialUserCreation,loginHandler } = require('../controller/auth.controller');

const router = require('express').Router();

const authRoute = require('./auth.route');
const depositRoute = require('./deposit.route');
const withdrawalRoute = require('./withdrawal.route');
const adminRoute = require('./admin.route');
const userRoute = require('./user.route');

router.use('/auth', authRoute)
router.use('/deposit', depositRoute)
router.use('/withdraw', withdrawalRoute)
router.use('/admin', adminRoute)
router.use('/users', userRoute)


module.exports = router