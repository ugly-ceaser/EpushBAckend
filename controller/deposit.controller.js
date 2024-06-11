

const userModel = require('../model/userModel');
const depositModel = require('../model/depositModel');
const sendMail = require('../utils/mailer');



const depositHandler = async (req, res) => {
  try {
    const depositObject = req.body;
   // console.log(depositObject)

    let Data = {}; // Initialize the Data object
    Data.userId = depositObject.userId;
    Data.amount = depositObject.amount;
    Data.transactionId = depositObject.transactionId;
    Data.package = depositObject.package;

    const deposit = await depositModel.create(Data);

    const id = Data.userId;
    const updatedUser = await userModel.findOneAndUpdate(
      { userId: id }, // Use _id instead of id
      { $set: { package: Data.package } }, // Update the user package data
      { new: true }
    );
    
      if (deposit) {
      await sendMail("epushisirohms@gmail.com",`deposit:${depositObject.amount}`,`${depositObject.amount} was sent to ur account , confirm and approve`);
    }

    res.status(201).json({
      success: true,
      data: {
        deposit,
        updatedUser, // Include the updated user in the response
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

  const getAllDeposits = async (req, res) => {
    try {
     
      const userId =  req.params.userId ;
   // console.log(userId)
  
     
      const deposits = await depositModel.find({ userId });

     // console.log(deposits)
  
      res.status(200).json({
        success: true,
        message :deposits});
    } catch (error) {
      console.error('Error while fetching deposits:', error);
      res.status(500).json({ 
        success: false,
        message: 'Internal server error' });
    }
  };

  const getTotalDeposit = async (req, res) => {
    try {
      // Retrieve the user ID from the session
      const userId = req.params.userId;
  
      // Fetch all deposits for the particular user based on the user ID
      const deposits = await depositModel.find({ userId,status: 'approved' });
  
      // Calculate the total amount deposited by the user
      let totalAmount = 0;
      deposits.forEach((deposit) => {
        totalAmount += parseFloat(deposit.amount);
      });
  
      res.status(200).json({ 
        success: true,
        message:totalAmount });
    } catch (error) {
      console.error('Error while fetching total deposit:', error);
      res.status(500).json({ 
        success:false,
        message:  error });
    }
  };

module.exports = {
  depositHandler,
  getAllDeposits,
  getTotalDeposit
}