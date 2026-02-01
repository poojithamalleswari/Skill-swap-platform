const express = require("express");
const router = express.Router();

const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/adminMiddleware");

router.get("/users", verifyToken, isAdmin, (req, res) => {
    db.query("SELECT id, email, role FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: "DB error" });
        res.json(results);
    });
});

router.delete("/skills/:id", verifyToken, isAdmin, (req, res) => {
    db.query(
        "DELETE FROM skills WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ message: "DB error" });
            res.json({ message: "Skill removed" });
        }
    );
});

router.put("/ban/:id", verifyToken, isAdmin, (req, res) => {
    db.query(
        "UPDATE users SET role='BANNED' WHERE id = ?",
        [req.params.id],
        (err) => {
            if (err) return res.status(500).json({ message: "DB error" });
            res.json({ message: "User banned" });
        }
    );
});

module.exports = router;
