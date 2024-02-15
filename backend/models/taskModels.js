const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({
  projectId: {
    type: 'String',
    required: true,
  },
  taskName: {
    type: String,
    required: [false, "Task Name is require"],
    // unique: true,
  },
  taskDescription: {
    type: String,
    // required: [true, "Your username is required"],
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mtsusers',
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

});

const taskModal = mongoose.model("MTSTask", taskSchema);



module.exports = taskModal