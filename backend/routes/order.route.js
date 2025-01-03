import express from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import {getOrders, changeOrderStatus, getUserOrders} from "../controllers/order.controller.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getOrders)
router.post("/change-status", protectRoute, adminRoute, changeOrderStatus)
router.get("/user", protectRoute, getUserOrders)

export default router;