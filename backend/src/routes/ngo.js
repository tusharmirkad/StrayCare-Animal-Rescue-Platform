import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import { applyNgo, getMyNgoApplication } from "../controllers/ngo.js";

const router = express.Router();

router.post("/apply", requireAuth, upload.single("document"), applyNgo);
router.get("/my", requireAuth, getMyNgoApplication);

export default router;
