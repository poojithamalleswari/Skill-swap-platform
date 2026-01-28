// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import routes and middleware
const authRoutes = require("./routes/authRoutes");
const { verifyToken } = require("./middleware/authMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

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

// ✅ THIS WAS MISSING
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
