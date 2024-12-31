import express from "express";
import {addToCart, removeFromCart, updateQuantity, getCartProducts} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart)
router.delete("/", protectRoute, removeFromCart)
router.put("/:id", protectRoute, updateQuantity)
router.get("/", protectRoute, getCartProducts)

export default router