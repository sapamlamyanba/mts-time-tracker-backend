
const User = require("../models/userModels");
const timesheetModel = require('../models/timesheetModels')

const projectModal = require("../models/projectModels");
const taskModal = require('../models/taskModels')


const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    // console.log('user.............', users);
    
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};
const getUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    
    

    if (!userId) {
      console.error('User ID is required');
      return res.status(400).send({
        success: false,
        message: 'User ID is required',
      });
    }    
    const timesheets = await timesheetModel.find({ userId });

    res.status(200).json({ success: true, data: timesheets });
  } catch (error) {
    console.error('Error fetching timesheets:', error);
    res.status(500).json({ success: false, error, message: 'Error fetching timesheets' });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(userId);

    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting user',
    });
  }
};

const createprojectController = async (req, res) => {
  try {
    const { projectName, projectDescription, task,account } = req.body;
   console.log('check',req.body);
   
    const createProject = new projectModal({
      projectName,
      projectDescription,
      task,
     account,
         });
        //  console.log('create',createProject);
         
    const savedProject = await createProject.save();
    res.status(201).send({  message: "Successful Create Project",
    success: true,
    project: savedProject })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while applying',
    });
  }
};
const getProjectController = async(req, res)=> {
  try {
    const {account } = req.body;
      const projects = await projectModal.find({account});    
      // console.log('project',projects);
      
    res.status(200).send({
      success: true,
      projects: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching projects',
    });
  }
};

const getProjectDetailsController = async (req, res) => {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      console.error('Project ID is required');
      return res.status(400).json({
        success: false,
        message: 'Project ID is required',
      });
    }
    
    const projectDetails = await projectModal.findById(projectId);
    if (!projectDetails) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: projectDetails,
    });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ success: false, error, message: 'Error fetching project details' });
  }
};

const deleteProjectController = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Check if the project exists
    const existingProject = await projectModal.findById(projectId);
    if (!existingProject) {
      return res.status(404).send({
        success: false,
        message: 'Project not found',
      });
    }

    // Delete the project from the database
    await projectModal.findByIdAndDelete(projectId);

    res.status(200).send({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting project',
    });
  }
};

const createtaskController = async (req, res) => {
  try {
    const {projectId, taskName, taskDescription } = req.body;
    const createTask = new taskModal({
      projectId,
      taskName,
      taskDescription
      // userID,
    });
    const savedTask = await createTask.save();
    res.status(201).send({  message: "Successful Create Task",
    success: true,
    task: savedTask })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while applying',
    });
  }
};

const getTaskController = async(req, res)=> {
  try {
    const { projectId } = req.params; 
    let tasks;
    
    if (projectId) {
        tasks = await taskModal.find({ projectId });
    } else {
        tasks = await taskModal.find(); 
    }   
    res.status(200).send({
        success: true,
        task: tasks
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while fetching Task',
    });
  }
};

const getTaskDetailController = async (req, res) => {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      console.error('Task ID is required');
      return res.status(400).json({
        success: false,
        message: 'Task ID is required',
      });
    }
    
    const taskDetails = await projectModal.findById(taskId);
    if (!taskId) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: taskDetails,
    });
  } catch (error) {
    console.error('Error fetching project details:', error);
    res.status(500).json({ success: false, error, message: 'Error fetching project details' });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await taskModal.findByIdAndDelete(taskId);
    
    if (!deletedTask) {
      return res.status(404).send({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Task deleted successfully',
      task: deletedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while deleting Task',
    });
  }
};

module.exports = {
 
  getAllUsersController,getUserController,createprojectController,
  getProjectController, getProjectDetailsController,createtaskController,
  getTaskController, deleteTaskController,deleteProjectController,deleteUserController,
  getTaskDetailController
  

};