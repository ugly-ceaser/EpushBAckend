
const depositModel = require('../model/depositModel')
const userModel = require('../model/userModel');
const adminModel = require('../model/adminModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error('Error while fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getAllBasicUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const basicUsers = users.filter(user => user.package.toLocaleLowerCase() === "basic" && user.role.toLocaleLowerCase() != "admin");

    //console.log(basicUsers)
    res.status(200).json({
      success: true,
      basicUsers,
    });
  } catch (error) {
    console.error('Error while fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getAllPremiumUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const premiumUsers = users.filter(user => user.package.toLocaleLowerCase() === "premium" && user.role.toLocaleLowerCase() != "admin");
    res.status(200).json({
      success: true,
      premiumUsers,
    });
  } catch (error) {
    console.error('Error while fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


const getAllAdvanceUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    const advanceUsers = users.filter(user => user.package.toLocaleLowerCase() === "advance"  && user.role.toLocaleLowerCase() != "admin");
    res.status(200).json({
      success: true,
      advanceUsers,
    });
  } catch (error) {
    console.error('Error while fetching all users:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const getTotalNumberOfUsers = async (req, res) => {
    try {
      const totalUsers = await userModel.countDocuments();
      res.status(200).json({
        success: true,
        totalUsers,
      });
    } catch (error) {
      console.error('Error while fetching total number of users:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };

  const deleteUserByUserId = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const deletedUser = await userModel.findOneAndDelete({ userId });
  
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error while deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };


const updateUserProfit = async (req, res) => {
  try {
   
    const userId = req.params.userId;

    //console.log(userId);
    
    const amount = req.params.amount;

    const profit = parseFloat(amount)


   

  
    // Fetch the user from the database
    const existingUser = await userModel.findOne({userId:userId});

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Calculate the updated profit by adding to the previous profit
    const updatedProfit = existingUser.profit + profit;

    // Update the user's profit in the database
    await userModel.findOneAndUpdate({userId:userId}, { profit: updatedProfit });

    res.status(200).json({
      success: true,
      message: 'User profit updated successfully',
    });
  } catch (error) {
    console.error('Error while updating user profit:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const adminLogin = async (req, res) => {
  
  const userDetails = req.body;

  try {
    
    const user = await userModel.findOne({ username: userDetails.username });

    if (!user) {
      // User with the provided username not found
      return res.status(404).json({ 
        success: false,
        message: 'User does not exist' 
      });
    }

   
    const isPasswordValid = await user.comparePassword(userDetails.password);

    if (!isPasswordValid) {
     
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    }

   
    req.session.user = {
      id: user._id,
      username: user.username,
      userId: user.userId
    };

   
    res.status(200).json({ 
      success: true, 
      data: user,
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};



module.exports = { 
  getAllUsers,
  updateUserProfit,
  getTotalNumberOfUsers,
  deleteUserByUserId,
  adminLogin,
  getAllBasicUsers,
  getAllPremiumUsers,
  getAllAdvanceUsers };
