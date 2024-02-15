
const timesheetModel = require('../models/timesheetModels');

const createTimesheet = async (req, res) => {
  try {
    const { userId, timesheetEntries } = req.body;

    if (!userId) {
      console.error('User ID is required');
      return res.status(400).send({
        success: false,
        message: 'User ID is required',
      });
    }


    if (!timesheetEntries || !timesheetEntries.length) {
      console.error('Invalid or undefined value for req.body.timesheetEntries');
      return res.status(400).send({
        success: false,
        message: 'Invalid or undefined value for req.body.timesheetEntries',
      });
    }

    const savedTimesheets = [];

    for (let entry of timesheetEntries) {
      const { xyz, ...rest } = entry;
      for (let hour of xyz) {
        const timesheetData = { ...rest, userId, hours: hour, status: 'New' };
        const timesheet = new timesheetModel(timesheetData);
        await timesheet.save();
        savedTimesheets.push(timesheet);
        console.log('Successfully saved');
      }
    }

    res.status(201).json(savedTimesheets);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while applying',
    });
  }
};

const getTimesheets = async (req, res) => {
  try {

    const userTimesheets = await timesheetModel.find({ userId: req.body.userId });


    if (!userTimesheets) {
      return res.status(404).json({
        success: false,
        message: "User timesheets not found",
        data: []
      });
    }
    res.status(200).json({
      success: true,
      message: "UserTimesheets fetched successfully",
      data: userTimesheets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while retrieving timesheets",
    });
  }
};

const approveTimesheet = async (req, res) => {
  const { id } = req.params;
  try {
    const timesheet = await timesheetModel.findById(id);
    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }
    timesheet.status = 'Approved';
    await timesheet.save();

    res.json({ message: 'Timesheet approved successfully', timesheet });
  } catch (error) {
    console.error('Error while approving timesheet:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

const rejectTimesheet = async (req, res) => {
  const { id } = req.params;
  try {
    const timesheet = await timesheetModel.findById(id);
    if (!timesheet) {
      return res.status(404).json({ error: 'Timesheet not found' });
    }
    timesheet.status = 'Rejected';
    await timesheet.save();
    res.json({ message: 'Timesheet rejected successfully', timesheet });
  } catch (error) {
    console.error('Error while rejecting timesheet:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const UpdateStatus = async (req, res) => {

  try {
    const timesheetId = req.params.id;
    const { status, hours } = req.body;

    if (!status || !hours) {
      return res.status(400).json({ success: false, message: 'Status & hours are required' });
    }

    const timesheet = await timesheetModel.findById(timesheetId);
    if (!timesheet) {
      return res.status(404).json({ success: false, message: 'Timesheet not found' });
    }

    timesheet.status = status;
    timesheet.hours = hours;
    await timesheet.save();

    res.status(200).json({ success: true, message: 'Timesheet status updated successfully', timesheet });
  } catch (error) {
    console.error('Error while updating timesheet status:', error);
    res.status(500).json({ success: false, error: error.message, message: 'Error while updating timesheet status' });
  }
}


module.exports = {
  createTimesheet, getTimesheets, approveTimesheet, rejectTimesheet, UpdateStatus
}