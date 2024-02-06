const express = require('express')
const {createTimesheet,getTimesheets} = require('../controllers/timesheetCtrl')
const { authController } = require('../controllers/userCtrl')
const router = express.Router()

router.post('/createTimesheet', createTimesheet)

router.get('/getTimesheet', getTimesheets )

module.exports = router;