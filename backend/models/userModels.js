const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  checkPassword: {
    type: String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mtsaccounts',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isManager:{
    type:Boolean,
    default:false
  }
 
});

const userModal = mongoose.model("MTSusers", userSchema);



module.exports = userModal