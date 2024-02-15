const express = require("express");
const {
  getAllUsersController, getUserController, createprojectController, getProjectController, getProjectDetailsController, getTaskController, createtaskController, deleteTaskController, deleteProjectController, deleteUserController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middleware/middleware");

const router = express.Router();


router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get('/getUser/:userId', getUserController)
router.delete('/deleteUser/:userId', deleteUserController);
router.post('/createProject', createprojectController )
router.get('/getProject', getProjectController)
router.get('/getProject/:projectId', getProjectDetailsController)
router.delete('/deleteProject/:projectId', deleteProjectController);
router.post('/createTask', createtaskController)
router.get('/getTask/:projectId', getTaskController)
router.delete('/deleteTask:taskId', deleteTaskController)

module.exports = router;