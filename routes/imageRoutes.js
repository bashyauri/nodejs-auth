const express = require("express");
const {
  uploadImage,
  fetchImages,
  deleteImage,
} = require("../controllers/ImageController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware,
  uploadImage
);
router.get("/", authMiddleware, adminMiddleware, fetchImages);
router.delete("/:id", authMiddleware, adminMiddleware, deleteImage);

module.exports = router;
