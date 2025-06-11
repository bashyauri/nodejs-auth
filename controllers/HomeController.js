const getHomePage = (req, res) => {
  const { userId, email, role, username } = req.user;

  res.status(200).json({
    message: "Welcome to the Home Page",
    user: {
      _id: userId,
      email,
      role,
      username,
    },
    success: true,
  });
};

const getAboutPage = (req, res) => {
  res.status(200).json({
    message: "Welcome to the About Page",
    success: true,
  });
};

module.exports = { getHomePage, getAboutPage };
