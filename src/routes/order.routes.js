const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");
const { verifyToken } = require("../middleware.js/auth.middleware");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { name, email, phone, address, city, state, pincode, total, items, paymentId } = req.body;
    const order = await prisma.order.create({
      data: {
        name, email, phone, address, city, state, pincode,
        total: parseFloat(total),
        items,
        paymentId,
        userId: req.user?.id || null,
      },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;