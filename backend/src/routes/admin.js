import express from "express";
import { requireAdmin } from "../middlewares/role.js";
import {
  getAdminStats,
  getPendingNgos,
  approveNgo,
  rejectNgo,
  getAllRescueRequests,
  getApprovedNgos,
  removeNgo
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", getAdminStats);
router.get("/pending-ngos",getPendingNgos);
router.post("/approve-ngo/:id", approveNgo);
router.post("/reject-ngo/:id", rejectNgo);
router.delete("/remove-ngo/:id", removeNgo);
router.get("/rescue-requests", getAllRescueRequests);
router.get("/approved-ngos", getApprovedNgos);

export default router;
