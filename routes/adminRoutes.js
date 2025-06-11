const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdminUser = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, isAdminUser, AdminController.getAdminDashboard);
router.get("/users", authMiddleware, isAdminUser, AdminController.getAllUsers);

module.exports = router;
