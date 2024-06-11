const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    userId: {
      type: String,
      default: generateUserId(), // Set the default value to generate a unique userId
      unique: true, // Ensure the userId is unique in the database
    },
    name: String,
    phone: {
      type: String,
      required: [true, 'Please specify a Phone number'],
    },
    email: {
      type: String,
      required: [true, 'Please specify an Email address'],
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    username: {
      type: String,
      required: [true, 'Please enter a username'],
    },
    profit:{
      type: Number,
      required:true,
      default: 0
    },
    initialDeposit: {
      type: Boolean,
      required: true,
      default: false
    },
    package:{
      type: String,
      required:false,
      default: 'basic'
    },

    role:{
      type: String,
      required:false,
      default: 'User'
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

function generateUserId() {
    console.log(uuidv4());
  return uuidv4(); // Generate a random UUID (Universally Unique Identifier)
}

module.exports = User;
