const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    date: {
        type: Date,
        require:true,
      
    },
    project: {
        type:String,
       
    },
    task: {
        type: String
    },
    shortdesc:{
        type: String
    },
    // duration:{
    //     type:Array,  
    //     require:true,  
    // },
    xyz:{
        
    },
    hours:{
        type:Number,  
     
    },
    status:{
        type:String,
    }
    
}, {timestamps:true})


const timeSheetModel = mongoose.model("MTSTimesheet", timesheetSchema);

module.exports = timeSheetModel