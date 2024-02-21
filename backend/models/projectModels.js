const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
 
  projectName: {
    type: String,
    // required: [false, "Project Name is require"],
    unique: true,
  },
  projectDescription: {
    type: String,
    // required: [true, "Your username is required"],
  },
  task:{
    type:String,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mtsaccounts',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
 
});

const projectModal = mongoose.model("mtsproject", projectSchema);



module.exports = projectModal