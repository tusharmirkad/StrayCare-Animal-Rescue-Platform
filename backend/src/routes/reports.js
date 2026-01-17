import express from "express";
import {
  createReport,
  getMyReports,
  getReport,
  updateReportStatus,
  deleteReport
} from "../controllers/reportController.js";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

// ✅ Create report (PROTECTED)
router.post("/", requireAuth, upload.single("image"), createReport);

// ✅ List my reports (PROTECTED)
router.get("/me", requireAuth, getMyReports);

// ✅ Get single report (PROTECTED)
router.get("/:id", requireAuth, getReport);

// ✅ Update status (PROTECTED – admin/ngo later)
router.patch("/:id/status", requireAuth, updateReportStatus);

// ✅ Delete report (PROTECTED)
router.delete("/:id", requireAuth, deleteReport);

export default router;
