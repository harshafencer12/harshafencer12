const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");
const { verifyToken } = require("../middleware.js/auth.middleware");

router.post("/apply", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, city, skills, reason } = req.body;
    const application = await prisma.volunteerApplication.create({
      data: {
        name,
        email,
        phone,
        city,
        skills,
        reason,
        userId: req.user.id,
      },
    });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;