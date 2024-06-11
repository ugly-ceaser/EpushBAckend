const { depositHandler,getAllDeposits,getTotalDeposit } = require('../controller/deposit.controller');

const router = require('express').Router();

// user deposits route
router.post('/',depositHandler) // process user deposits
router.get('/all/:userId', getAllDeposits) // fetch all user deposit
router.get('/getTotal/:userId',getTotalDeposit) // fetch user total deposit


module.exports = router