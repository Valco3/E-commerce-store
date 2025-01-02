import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import {getOrders, changeOrderStatus} from "../controllers/order.controller.js";
const router = express.Router();

// router.post("/signup", signup)
// router.post("/login", login)
// router.post("/logout", logout)
// router.post("/refresh-token", refreshToken)
// router.get("/profile", protectRoute, getProfile)
router.get("/", protectRoute, adminRoute, getOrders)
router.post("/change-status", protectRoute, adminRoute, changeOrderStatus)

export default router;