import Ngo from "../models/Ngo.js";

export const applyNgo = async (req, res) => {
  try {
    // ✅ FIX: use Clerk userId
    const userId = req.auth.userId;

    const exists = await Ngo.findOne({ userId });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Application already submitted" });
    }

    // ✅ FIX: handle uploaded document
    const documentUrl = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const ngo = await Ngo.create({
      userId,
      ngoName: req.body.ngoName,
      email: req.auth.sessionClaims?.email,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      description: req.body.description,
      documentUrl,
      status: "pending",
    });

    return res.status(201).json({
      message: "NGO application submitted successfully",
      ngo,
    });
  } catch (error) {
    console.error("Apply NGO error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMyNgoApplication = async (req, res) => {
  try {
    // ✅ FIX: Clerk userId
    const ngo = await Ngo.findOne({ userId: req.auth.userId });
    return res.json(ngo || null);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getApprovedNgos = async (req, res) => {
  try {
    const ngos = await Ngo.find({ status: "Approved" }).sort({
      createdAt: -1,
    });

    res.status(200).json(ngos);
  } catch (error) {
    console.error("Get NGOs error:", error);
    res.status(500).json({ message: "Failed to fetch NGOs" });
  }
};
