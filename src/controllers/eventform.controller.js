const prisma = require("../config/prisma");
const crypto = require("crypto");

// Admin creates a form for an event
exports.createForm = async (req, res) => {
  try {
    const { eventId, fields, amount, upiQrImage, upiId } = req.body;
    const form = await prisma.eventForm.create({
      data: { eventId, fields, amount: parseFloat(amount), upiQrImage, upiId },
    });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get form for an event
exports.getForm = async (req, res) => {
  try {
    const { eventId } = req.params;
    const form = await prisma.eventForm.findUnique({
      where: { eventId },
    });
    if (!form) return res.status(404).json({ message: "No form found for this event" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Volunteer submits form
exports.submitForm = async (req, res) => {
  try {
    const { formId, responses, paymentProof } = req.body;
    const ticketCode = crypto.randomBytes(6).toString("hex").toUpperCase();
    const submission = await prisma.eventFormSubmission.create({
      data: {
        formId,
        userId: req.user?.id || null,
        responses,
        paymentProof,
        ticketCode,
        status: "Pending",
      },
    });
    res.json({ ...submission, ticketCode });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin gets all submissions for a form
exports.getSubmissions = async (req, res) => {
  try {
    const { formId } = req.params;
    const submissions = await prisma.eventFormSubmission.findMany({
      where: { formId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin updates submission status
exports.updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await prisma.eventFormSubmission.update({
      where: { id },
      data: { status },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};