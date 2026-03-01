const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const coupleRoutes = require("./routes/coupleRoutes");
app.use("/api", coupleRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Financial Mirror Backend Running...");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed:", error);
  });

// Port Setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});