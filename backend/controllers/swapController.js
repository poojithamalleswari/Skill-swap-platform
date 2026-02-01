const db = require("../config/db");

exports.createSwapRequest = (req, res) => {
    const requesterId = req.user.id;
    const { skillId } = req.body;

    const query =
        "INSERT INTO swap_requests (requester_id, skill_id) VALUES (?, ?)";

    db.query(query, [requesterId, skillId], (err) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }
        res.json({ message: "Swap request sent" });
    });
};

exports.getIncomingRequests = (req, res) => {
    const userId = req.user.id;

    const query = `
    SELECT sr.id, sr.status, s.title, u.email AS requester
    FROM swap_requests sr
    JOIN skills s ON sr.skill_id = s.id
    JOIN users u ON sr.requester_id = u.id
    WHERE s.user_id = ?
  `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }
        res.json(results);
    });
};

exports.updateRequestStatus = (req, res) => {
    const { status } = req.body;
    const requestId = req.params.id;

    const query =
        "UPDATE swap_requests SET status = ? WHERE id = ?";

    db.query(query, [status, requestId], (err) => {
        if (err) {
            return res.status(500).json({ message: "DB error" });
        }
        res.json({ message: "Request updated" });
    });
};
