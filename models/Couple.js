const mongoose = require("mongoose");

const coupleSchema = new mongoose.Schema({
  husbandName: {
    type: String,
    required: true
  },
  wifeName: {
    type: String,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  godOffering: {
    type: Number,
    default: 0
  },
  rent: {
    type: Number,
    default: 0
  },
  shopping: {
    type: Number,
    default: 0
  },
  children: {
    type: Number,
    default: 0
  },
  medicines: {
    type: Number,
    default: 0
  },
  loans: {
    type: Number,
    default: 0
  },
  savings: {
    type: Number,
    default: 0
  },
  others: {
    type: Number,
    default: 0
  },
  totalAllocated: {
    type: Number,
    default: 0
  },
  remainingBalance: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Couple", coupleSchema);