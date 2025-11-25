const express = require("express");
const Lead = require("../models/Lead");
const auth = require("../middleware/auth");


const router = express.Router();

// 1️⃣ Create Lead
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;

    const lead = await Lead.create({
      userId: req.user.id,
      name,
      email,
      phone,
      status,
    });

    res.json({ message: "Lead created", lead });
  } catch (error) {
    res.status(500).json({ message: "Lead create failed", error });
  }
});

// 2️⃣ Get Leads (Search + Filter + Pagination)
router.get("/", auth, async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    let filter = { userId: req.user.id };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const leads = await Lead.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      leads,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leads", error });
  }
});

// 3️⃣ Get Single Lead
router.get("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lead", error });
  }
});

// 4️⃣ Update Lead
router.put("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json({ message: "Lead updated", lead });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

// 5️⃣ Delete Lead
router.delete("/:id", auth, async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
});

// 6️⃣ Add Note
router.post("/:id/note", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text)
      return res.status(400).json({ message: "Note text required" });

    const lead = await Lead.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!lead) return res.status(404).json({ message: "Lead not found" });

    lead.notes.push({ text, date: new Date() });
    await lead.save();

    res.json({ message: "Note added", lead });
  } catch (error) {
    res.status(500).json({ message: "Failed to add note", error });
  }
});


module.exports = router;
