require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* =========================
   Middleware
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   Routes
========================= */
const coupleRoutes = require("./routes/coupleRoutes");
app.use("/api", coupleRoutes);

/* =========================
   Test Route
========================= */
app.get("/", (req, res) => {
  res.send("Financial Mirror Backend Running 🚀");
});

/* =========================
   MongoDB Connection
========================= */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected Successfully");
})
.catch((error) => {
  console.error("❌ MongoDB Connection Failed:", error);
  process.exit(1); // stop server if DB fails
});

/* =========================
   Port Setup
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});