const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEST API
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is connected!" });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "test@gmail.com" && password === "123456") {
        return res.json({
            user: { email },
            token: "fake-jwt-token"
        });
    }

    res.status(401).json({ message: "Invalid credentials" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
