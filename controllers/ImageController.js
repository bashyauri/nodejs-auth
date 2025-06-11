const Image = require("../models/Image");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../helpers/cloudinaryHelper");
const fs = require("fs");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: `File is required ${req.body}`,
      });
    }

    const result = await uploadToCloudinary(req.file.path, "images");

    const newImage = new Image({
      url: result.url,
      publicId: result.publicId,
      altText: req.body.altText || "No description provided",

      uploadedBy: req.user.userId,
    });

    await newImage.save();
    // Remove the file from local storage after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      data: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const fetchImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;
    const images = await Image.find()
      .populate("uploadedBy", "username email")
      .skip(skip)
      .limit(limit)
      .sort(sortObj);
    if (images) {
      // If images are found, return them
      res.status(200).json({
        success: true,
        data: images,
        totalImages,
        currentPage: page,
        totalPages,
      });
    } else {
      // If no images are found, return a 404 response
      res.status(404).json({
        success: false,
        message: "No images found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    if (image.uploadedBy.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }
    // Delete image from Cloudinary
    await deleteFromCloudinary(image.publicId);

    // Delete image from database
    await Image.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { uploadImage, fetchImages, deleteImage };
