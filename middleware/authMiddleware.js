const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
      success: false,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(403).json({
      message: "Forbidden access",
      success: false,
    });
  }

  //   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return res.status(403).json({
  //         message: "Forbidden access",
  //         success: false,
  //       });
  //     }
  //     req.user = decoded;
  //     next();
  //   });
};

module.exports = authMiddleware;
