const express = require("express");
const HomeController = require("../controllers/HomeController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, HomeController.getHomePage);
router.get("/about", authMiddleware, HomeController.getAboutPage);

module.exports = router;
