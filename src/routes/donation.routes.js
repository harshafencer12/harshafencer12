const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

router.post("/", async (req, res) => {
  try {
    const { name, email, amount, method, message, paymentId } = req.body;
    const donation = await prisma.donation.create({
      data: { name, email, amount: parseFloat(amount), method, message, paymentId },
    });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;