
const userModel = require('../model/userModel');


const fetchUserDetails = async (req, res) => 
{
    const userId =  req.params.userId ;
   // console.log(userId)

    const userDetails = await userModel.findOne({userId})

   // console.log(userDetails)

    if(!userDetails){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    
    }else{
        return res.status(200).json({
            success: true,
            message: userDetails
        })      
}

}

const updateUserDetails = async (req, res) => {
    const userData = req.body;
    const updateFields = {};
  
    // Check if userData.username is provided and not empty
    if (userData.username) {
      updateFields.username = userData.username;
    }
  
    // Check if userData.email is provided and not empty
    if (userData.email) {
      updateFields.email = userData.email;
    }
  
    // Check if userData.phone is provided and not empty
    if (userData.phone) {
      updateFields.phone = userData.phone;
    }
  
    if (Object.keys(updateFields).length === 0) {
      // No valid fields to update
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update',
      });
    }
  
    try {
      // Check if the user exists
      const existingUser = await userModel.findOne({ userId: userData.userId });
  
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Update the specified fields
      Object.assign(existingUser, updateFields);
      const updatedUser = await existingUser.save();
  
      return res.status(200).json({
        success: true,
        message: 'User details updated successfully',
        updatedUser: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
  
  



module.exports = {
    updateUserDetails,
    fetchUserDetails,
   
  };

