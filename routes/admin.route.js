    const {
        getAllUsers,
        updateUserProfit,
        getTotalNumberOfUsers,
        deleteUserByUserId,
        adminLogin,
        getAllBasicUsers,
        getAllPremiumUsers,
        getAllAdvanceUsers} = require('../controller/admin.controller');

  

    const {
        getTotalDeposit,
        fetchDepositDetails,
        updateDepositDetails,
        handleDeposit,
        depositUser,
        fetchAllDeposits,
        fetchAllPendingDeposits,
        handleInitDepo,
        fetchInitDepo} = require('../controller/adminDeposit.controller');
        
        
    const {
        handleWithdrawal,
        getTotalWithdrawal,
        fetchAllWithdrawals,
        fetchAllPendingWithdrawals,
        getTotaPendinglWithdrawal} = require('../controller/adminWithdrawal.controller');

    const router = require('express').Router();


    //admin Routes

    router.get('/Users',getAllUsers); // to get all users
    router.get('/Basic',getAllBasicUsers); // to get all users
    router.get('/Premium',getAllPremiumUsers); // to get all users
    router.get('/Advance',getAllAdvanceUsers); // to get all users
    router.get('/updateProfit/:amount/:userId',updateUserProfit) // to update  user profit
    router.get('/getAllUsers',getTotalNumberOfUsers) // to get total number of users
    router.get('/deleteUser/:userId',deleteUserByUserId) // to delete user by user id
    router.post('/',adminLogin); // admin login
    router.get('/handleDeposit/:transactionId/:status',handleDeposit) // to approve or decline transaction 
    router.put('/handleDeposit/:userId/:transactionId/:description',handleInitDepo)//handle initial transaction
    

    router.get('/totalDeposit',getTotalDeposit) //get total deposit
    router.put('/handleDeposit/${depositId}/${status}',handleDeposit) //handle deposit transaction
  
    router.get('/getAllDeposits',fetchAllDeposits) //fetches all deposit
    router.get('/getDepositDetails/:transactionId',fetchDepositDetails)
    router.post('/getDepositDetails',updateDepositDetails)
    router.get('/getAllPendingDeposits',fetchAllPendingDeposits) //fetches all pending deposit
    router.get('/getAllinitDeposits',fetchInitDepo) //fetches all init deposit
    router.post('/deposit',depositUser) //deposit for user


    router.get('/handleWithdrawal/:transactionId/:status', handleWithdrawal); //handle withdrawal for transaction
    router.get('/totalWithdrawal', getTotalWithdrawal); //get total withdrawal transaction
    router.get('/pendingtotalWithdrawal',  getTotaPendinglWithdrawal); //get total withdrawal transaction
    
    router.get('/getAllWithdrawals', fetchAllWithdrawals); //fetch all withdrawals
    router.get('/getAllPendingWithdrawals', fetchAllPendingWithdrawals); //fetch all




    module.exports = router
