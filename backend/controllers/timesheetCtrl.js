
const timesheetModel = require('../models/timesheetModels')

const createTimesheet = async (req, res) => {
  try {
    const { timesheetEntries } = req.body;

    if (!timesheetEntries || !timesheetEntries.length) {
      console.error('Invalid or undefined value for req.body.timesheetEntries');
      res.status(400).send({
        success: false,
        message: 'Invalid or undefined value for req.body.timesheetEntries',
      });
      return;
    }

    const savedTimesheet = new timesheetModel({ ...timesheetEntries[0] });

    for (let i = 0; i < timesheetEntries.length; i++) {
      const timesheet = new timesheetModel({ ...timesheetEntries[i] });
      timesheet.hours = timesheetEntries[i].hours;
      console.log(timesheet);
      await timesheet.save();
      console.log('successfully saved');
    }

    res.status(201).json(savedTimesheet);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying",
    });
  }
};
const getTimesheets = async (req, res) => {
  try {
    // Fetch all timesheets from the database
    const allTimesheets = await timesheetModel.find();

    // Return the fetched timesheets in the response
    res.status(200).json(allTimesheets);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error,
      message: "Error while retrieving timesheets",
    });
  }
};

module.exports = {
  createTimesheet, getTimesheets
}