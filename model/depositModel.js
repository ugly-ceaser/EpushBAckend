const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      Unique: [true, 'please enter a unique transaction'],
    },
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: [true, 'Please specify the deposit amount'],
    },
    status: {
      type: String,
      default: 'pending',
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
