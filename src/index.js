require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const eventFormRoutes = require("./routes/eventform.routes");
const volunteerRoutes = require("./routes/volunteer.routes");
const productRoutes = require("./routes/product.routes");
const donationRoutes = require("./routes/donation.routes");
const orderRoutes = require("./routes/order.routes");
const app = express();

app.use(cors({
  origin: ["https://glittering-centaur-847272.netlify.app", "http://localhost:5173"],
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/eventforms", eventFormRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/orders", orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});