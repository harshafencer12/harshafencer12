const prisma = require("../config/prisma");

// Get all volunteer applications
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await prisma.volunteerApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update volunteer status
exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Update application status
    const updated = await prisma.volunteerApplication.update({
      where: { id },
      data: { status },
    });

    // If approved — automatically update user role to VOLUNTEER
    if (status === "Approved" && updated.userId) {
      await prisma.user.update({
        where: { id: updated.userId },
        data: { role: "VOLUNTEER" },
      });
    }

    // If rejected — revert role back to USER
    if (status === "Rejected" && updated.userId) {
      await prisma.user.update({
        where: { id: updated.userId },
        data: { role: "USER" },
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user role
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const updated = await prisma.user.update({
      where: { id },
      data: { role },
    });
    res.json({ message: "Role updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create report
exports.createReport = async (req, res) => {
  try {
    const { title, description, category, date, images } = req.body;
    const report = await prisma.report.create({
      data: {
        title,
        description,
        category,
        date: new Date(date),
        images: images || [],
        adminId: req.user.id,
      },
    });
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all reports
exports.getReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all event form submissions
exports.getEventRegistrations = async (req, res) => {
  try {
    const submissions = await prisma.eventFormSubmission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        form: {
          include: {
            event: { select: { title: true, date: true, location: true } }
          }
        }
      }
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
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

exports.getEventRegistrations = async (req, res) => {
  try {
    const submissions = await prisma.eventFormSubmission.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true, phone: true } },
        form: {
          include: {
            event: { select: { title: true, date: true, location: true } }
          }
        }
      }
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};