const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/eventform.controller");
const { verifyToken, verifyAdmin } = require("../middleware.js/auth.middleware");

router.post("/", verifyToken, verifyAdmin, ctrl.createForm);
router.get("/:eventId", ctrl.getForm);
router.post("/submit", verifyToken, ctrl.submitForm);
router.get("/submissions/:formId", verifyToken, verifyAdmin, ctrl.getSubmissions);
router.patch("/submissions/:id", verifyToken, verifyAdmin, ctrl.updateSubmissionStatus);

module.exports = router;