const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken, verifyAdmin } = require("../middleware.js/auth.middleware");

router.get("/volunteers", verifyToken, verifyAdmin, adminController.getVolunteers);
router.patch("/volunteers/:id", verifyToken, verifyAdmin, adminController.updateVolunteerStatus);
router.get("/donations", verifyToken, verifyAdmin, adminController.getDonations);
router.get("/orders", verifyToken, verifyAdmin, adminController.getOrders);
router.get("/users", verifyToken, verifyAdmin, adminController.getUsers);
router.patch("/users/:id/role", verifyToken, verifyAdmin, adminController.updateUserRole);
router.post("/reports", verifyToken, verifyAdmin, adminController.createReport);
router.get("/reports", verifyToken, verifyAdmin, adminController.getReports);
router.get("/registrations", verifyToken, verifyAdmin, adminController.getEventRegistrations);
router.patch("/registrations/:id", verifyToken, verifyAdmin, adminController.updateSubmissionStatus);
router.get("/reports/public", adminController.getReports);
module.exports = router;