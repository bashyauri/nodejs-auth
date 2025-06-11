require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require("./database/db");

// middleware
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
const homeRoutes = require("./routes/homeRoutes");
app.use("/api/home", homeRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
const imageRoutes = require("./routes/imageRoutes");
app.use("/api/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
