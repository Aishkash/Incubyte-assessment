import { Router } from "express";
import {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "./sweets.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { authorizeAdmin } from "../../middlewares/role.middleware";

const router = Router();

// CRUD
router.post("/sweets", authenticate, createSweet);
router.get("/sweets", authenticate, getSweets);
router.get("/sweets/search", authenticate, searchSweets);
router.put("/sweets/:id", authenticate, updateSweet);
router.delete("/sweets/:id", authenticate, authorizeAdmin, deleteSweet);

// Inventory
router.post("/sweets/:id/purchase", authenticate, purchaseSweet);
router.post("/sweets/:id/restock", authenticate, authorizeAdmin, restockSweet);

export default router;
