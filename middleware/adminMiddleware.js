const isAdminUser = (req, res, next) => {
  const user = req.user;

  // Check if user is authenticated and has admin role
  if (user && user.role === "admin") {
    return next();
  }

  // If not an admin, return forbidden response
  return res.status(403).json({
    message: "Access denied. Admins only.",
    success: false,
  });
};

module.exports = isAdminUser;
