const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const path = require('path')
const cors = require('cors');

const authMiddleware = require('./middleware/middleware')

const app = express();


dotenv.config()

// Enable CORS for all routes
app.use(cors());

//mongodb connection
connectDB();

//middleware
app.use(express.json())


const changePassword = require('./controllers/change-Password')
//routes
app.use("/api/user", require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user/', require('./routes/timesheetRoutes'));
app.use('/api/password-reset', require('./controllers/passwordReset'))
app.use('/change-password', authMiddleware,changePassword)


const port = 8000;

app.listen(port, ()=> {
    console.log(
        `App is Listening in Port:  ${port}`
    )
})