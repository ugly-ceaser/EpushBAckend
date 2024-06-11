const withdrawalModel = require('../model/withdrawalModel');
const sendMail = require('../utils/mailer');


const withdrawalHandler = async (req, res) => {
  try {

    const withdrawObject = req.body
    const withdrawal = await withdrawalModel.create(withdrawObject);

    if (withdrawal) {
      await sendMail("epushisirohms@gmail.com",`withdrawal:${withdrawObject.amount}`,`${withdrawObject.amount} request was made , confirm and approve`);
    }
    res.status(201).json({
      success: true,
      data: withdrawal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllWithdrawals = async (req, res) => {
  try {
    const userId = req.params.userId;
    const withdrawals = await withdrawalModel.find({ userId });
    res.status(200).json({
      success: true,
      message: withdrawals,
    });
  } catch (error) {
    console.error('Error while fetching withdrawals:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getTotalWithdrawal = async (req, res) => {
  try {
    const userId = req.params.userId;
    const withdrawals = await withdrawalModel.find({ userId, status: 'approved' });

    let totalAmount = 0;
    withdrawals.forEach((withdrawal) => {
      totalAmount += parseFloat(withdrawal.amount);
    });

    res.status(200).json({
      success: true,
      message: totalAmount,
    });
  } catch (error) {
    console.error('Error while fetching total withdrawal:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


module.exports = {
  withdrawalHandler,
  getAllWithdrawals,
  getTotalWithdrawal
}
