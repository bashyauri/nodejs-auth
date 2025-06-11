const express = require("express");
const AuthController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User registration route
router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/change-password", authMiddleware, AuthController.changePassword);

// // User login route
// router.post("/login", AuthController.loginUser);

module.exports = router;
