const db = require("../config/db");

exports.addSkill = (req, res) => {
    const { title, type, category } = req.body;
    const userId = req.user.id;

    if (!title || !type) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const query =
        "INSERT INTO skills (user_id, title, type, category) VALUES (?, ?, ?, ?)";

    db.query(query, [userId, title, type, category], (err) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }
        res.json({ message: "Skill added successfully" });
    });
};

exports.getAllSkills = (req, res) => {
    const { search, type } = req.query;

    let query = `
    SELECT skills.id, skills.title, skills.type, skills.category, users.email
    FROM skills
    JOIN users ON skills.user_id = users.id
    WHERE 1=1
  `;

    const params = [];

    if (search) {
        query += " AND skills.title LIKE ?";
        params.push(`%${search}%`);
    }

    if (type) {
        query += " AND skills.type = ?";
        params.push(type);
    }

    query += " ORDER BY skills.created_at DESC";

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }
        res.json(results);
    });
};
