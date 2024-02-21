const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
 
  accountName: {
    type: String,
    required: [false, "Account Name is require"],
    // unique: true,
  },
  accountDomain: {
    type: String,
    // required: [true, "Your username is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

 
});

const accountModal = mongoose.model("mtsaccounts", accountSchema);

module.exports = accountModal