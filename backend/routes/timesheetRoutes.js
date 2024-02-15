const express = require('express')
const {createTimesheet,getTimesheets, approveTimesheet, UpdateStatus, rejectTimesheet} = require('../controllers/timesheetCtrl')
const { authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middleware/middleware')
const router = express.Router()

router.post('/createTimesheet', createTimesheet)

router.get('/getTimesheet',authMiddleware, getTimesheets )

router.put('/timesheets/:id/approve',approveTimesheet)

router.put('/timesheets/:id/reject',rejectTimesheet)

router.put('/updateTimesheet/:id', UpdateStatus)

module.exports = router;