const express = require("express");
const router = express.Router();

const {
    createSwapRequest,
    getIncomingRequests,
    updateRequestStatus,
} = require("../controllers/swapController");

const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, createSwapRequest);
router.get("/incoming", verifyToken, getIncomingRequests);
router.put("/:id", verifyToken, updateRequestStatus);

module.exports = router;
