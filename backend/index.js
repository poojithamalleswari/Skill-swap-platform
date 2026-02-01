// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import routes and middleware
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();
const skillRoutes = require("./routes/skillRoutes");
const swapRoutes = require("./routes/swapRoutes");
const adminRoutes = require("./routes/adminRoutes");
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Test route
app.get("/", (req, res) => {
    res.send("Skill Swap Backend Running");
});

// Protected route (JWT test)
app.get("/api/protected", verifyToken, (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});
app.use("/api/skills", skillRoutes);
app.use("/api/swaps", swapRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
