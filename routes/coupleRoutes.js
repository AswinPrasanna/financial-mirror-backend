const express = require("express");
const router = express.Router();
const Couple = require("../models/Couple");

// 1️⃣ Create Couple (Login)
router.post("/login", async (req, res) => {
  try {
    const { husbandName, wifeName, income } = req.body;

    const newCouple = new Couple({
      husbandName,
      wifeName,
      income
    });

    const savedCouple = await newCouple.save();
    res.status(201).json(savedCouple);

  } catch (error) {
    res.status(500).json({ message: "Error creating couple", error });
  }
});

// 2️⃣ Submit Financial Data
router.put("/submit/:id", async (req, res) => {
  try {
    const {
      godOffering,
      rent,
      shopping,
      children,
      medicines,
      loans,
      savings,
      others
    } = req.body;

    const totalAllocated =
      godOffering +
      rent +
      shopping +
      children +
      medicines +
      loans +
      savings +
      others;

    const couple = await Couple.findById(req.params.id);

    if (!couple) {
      return res.status(404).json({ message: "Couple not found" });
    }

    const remainingBalance = couple.income - totalAllocated;

    couple.godOffering = godOffering;
    couple.rent = rent;
    couple.shopping = shopping;
    couple.children = children;
    couple.medicines = medicines;
    couple.loans = loans;
    couple.savings = savings;
    couple.others = others;
    couple.totalAllocated = totalAllocated;
    couple.remainingBalance = remainingBalance;

    const updatedCouple = await couple.save();

    res.json(updatedCouple);

  } catch (error) {
    res.status(500).json({ message: "Error submitting data", error });
  }
});

// 3️⃣ Get All Couples (Admin)
router.get("/couples", async (req, res) => {
  try {
    const couples = await Couple.find().sort({ createdAt: -1 });
    res.json(couples);
  } catch (error) {
    res.status(500).json({ message: "Error fetching couples", error });
  }
});

// 4️⃣ Get Single Couple by ID 
router.get("/couples/:id", async (req, res) => {
  try {
    const couple = await Couple.findById(req.params.id);

    if (!couple) {
      return res.status(404).json({ message: "Couple not found" });
    }

    res.json(couple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5️⃣ Delete Couple (Admin)
router.delete("/couple/:id", async (req, res) => {
  try {
    const deletedCouple = await Couple.findByIdAndDelete(req.params.id);

    if (!deletedCouple) {
      return res.status(404).json({ message: "Couple not found" });
    }

    res.json({ message: "Couple deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting couple", error });
  }
});

module.exports = router;