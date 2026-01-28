const express = require("express");
const router = express.Router();

const { addSkill, getAllSkills } = require("../controllers/skillController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, addSkill);
router.get("/", getAllSkills);

module.exports = router;
