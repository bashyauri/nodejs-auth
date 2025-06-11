const getAdminDashboard = (req, res) => {
  res.status(200).json({
    message: "Welcome to the Admin Dashboard",
    success: true,
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "User list retrieved successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { getAdminDashboard, getAllUsers };
