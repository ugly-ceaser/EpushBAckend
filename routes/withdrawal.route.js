const { withdrawalHandler, getAllWithdrawals, getTotalWithdrawal } = require('../controller/withdrawal.controller');

const router = require('express').Router();

//user withdrawal route

router.post('/', withdrawalHandler); // process user withdraw
router.get('/all/:userId', getAllWithdrawals); // fetch all user withdraw
router.get('/getTotal/:userId', getTotalWithdrawal); // get total user withdraw

module.exports = router;
