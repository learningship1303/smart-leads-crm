import express from "express";

import {
  getLeads,
  createLead,
  deleteLead,
  updateLead,
} from "../controllers/leadController";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware";

const router = express.Router();

/*
========================================
LEAD ROUTES
========================================
*/

// GET ALL LEADS
router.get(
  "/",
  protect,
  getLeads
);

// CREATE LEAD
router.post(
  "/",
  protect,
  createLead
);

// UPDATE LEAD
router.put(
  "/:id",
  protect,
  updateLead
);

// DELETE LEAD
// ONLY ADMIN CAN DELETE
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteLead
);

export default router;