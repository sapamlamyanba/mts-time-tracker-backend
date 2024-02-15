const User = require("../models/userModels");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const uuid = require('uuid')

function generateUniquieSessionIdentifier() {
  return uuid.v4
}

const jwtSecret = process.env.JWT_SECRET;


const registerController = async (req, res) => {
  try{
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send({  message: "Successful Register",
    success: true,
    userId: newUser._id});
  }
  catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    })
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token,userId: user._id  });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.body.userId });
   
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

const logoutController = async(req, res) => {
  try {
    const userId = await User.findById({_id: req.body.userId});

    const user = await User.findByIdAndUpdate(userId, {activeSessionId: null});

    if(!user){
      return res.status(404).send({message: 'User not fount', success: false});
    }

    res.status(200).send({message: 'Logout Success', success: true})
  } catch (error) {
    console.log(error);
    res.status(500).send({message:`Error in logout CTRL ${error.message}`})
  }
}


module.exports = {
  registerController,
  loginController,
  logoutController,
  authController
}