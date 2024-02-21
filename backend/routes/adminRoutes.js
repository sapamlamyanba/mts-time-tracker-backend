const express = require("express");
const {
  getAllUsersController, getUserController, createprojectController, getProjectController, getProjectDetailsController, getTaskController, createtaskController, deleteTaskController, deleteProjectController, deleteUserController, getTaskDetailController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middleware/middleware");
const { authController } = require("../controllers/userCtrl");
const { createAccountController, getAccountController, deleteAccountController, getAccountDetatilsController } = require("../controllers/accountController");

const router = express.Router();


router.get("/getAllUsers", authMiddleware, getAllUsersController);
router.get('/getUser/:userId',authMiddleware, getUserController)
router.delete('/deleteUser/:userId',authMiddleware, deleteUserController);
router.post('/createProject',authMiddleware, createprojectController )
router.post('/getProject', authMiddleware, getProjectController)
router.get('/getProject/:projectId',authMiddleware, getProjectDetailsController)
router.delete('/deleteProject/:projectId',authMiddleware, deleteProjectController);
router.post('/createTask',authMiddleware, createtaskController)
router.get('/getTask/:projectId',authMiddleware, getTaskController)
router.get('/getTask/:taskId',authMiddleware, getTaskDetailController)
router.delete('/deleteTask:taskId',authMiddleware, deleteTaskController)
router.post('/createAccount',authMiddleware, createAccountController)
router.get('/getAccount', authMiddleware, getAccountController)
router.delete('/deleteAccount/:accountId',authMiddleware, deleteAccountController)
router.get('/getAccount/:accountId',authMiddleware, getAccountDetatilsController)

module.exports = router;