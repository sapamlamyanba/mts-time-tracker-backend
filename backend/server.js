const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const path = require('path')
const cors = require('cors');

const app = express();


dotenv.config()

// Enable CORS for all routes
app.use(cors());

//mongodb connection
connectDB();

//middleware
app.use(express.json())

//routes
app.use("/api/user", require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/user/', require('./routes/timesheetRoutes'))


const port = process.env.PORT || 8000;

app.listen(port, ()=> {
    console.log(
        `App is Listening in Port:  ${port}`
    )
})