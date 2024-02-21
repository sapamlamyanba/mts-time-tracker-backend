const express = require('express')
const {createTimesheet,getTimesheets, approveTimesheet, UpdateStatus, rejectTimesheet} = require('../controllers/timesheetCtrl')
const { authController } = require('../controllers/userCtrl')
const authMiddleware = require('../middleware/middleware')
const router = express.Router()

router.post('/createTimesheet',authMiddleware, createTimesheet)

router.get('/getTimesheet/',authMiddleware, getTimesheets )

router.put('/timesheets/:id/approve',authMiddleware,approveTimesheet)

router.put('/timesheets/:id/reject',authMiddleware,rejectTimesheet)

router.put('/updateTimesheet/:id',authMiddleware, UpdateStatus)

module.exports = router;