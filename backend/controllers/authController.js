const db = require("../config/db");

exports.loginUser = (req, res) => {
    const { email } = req.body;

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }

        res.json({ user: results[0] });
    });
};
