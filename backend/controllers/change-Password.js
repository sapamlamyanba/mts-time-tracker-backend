const User = require('../models/userModels')
const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
       
    const { email, checkPassword, newPassword } = req.body;   
    
    try {    
      const user = await User.findOne({ email, });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      
      const isPasswordValid = await bcrypt.compare(checkPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Old password is incorrect." });
      }
  
      // Generate a new password hash
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
  
      // Update user password
      user.password = hashedNewPassword;
      await user.save();
  
      return res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  });

  module.exports = router;