import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import {
  createRescue,
  getPendingRescues,
  acceptRescue,
  updateStatus,
  getAllRescues,
} from "../controllers/rescueController.js";

const router = express.Router();

// USER creates rescue request
router.post("/create", requireAuth, createRescue);

// NGO gets pending requests
router.get("/pending", requireAuth, getPendingRescues);

// NGO accepts rescue
router.put("/accept/:id", requireAuth, acceptRescue);

// NGO updates status
router.put("/status/:id", requireAuth, updateStatus);

// ADMIN fetch all
router.get("/all", requireAuth, getAllRescues);

export default router;
