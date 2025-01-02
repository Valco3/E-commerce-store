import express from "express";
import {protectRoute, adminRoute, superAdminRoute} from "../middleware/auth.middleware.js"
import {getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getProductsByCategory, toggleFeatured} from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", protectRoute, adminRoute , getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/category/:category", getProductsByCategory)
router.post("/", protectRoute, superAdminRoute, createProduct)
router.patch("/:id", protectRoute, superAdminRoute, toggleFeatured)
router.delete("/:id", protectRoute, superAdminRoute, deleteProduct)

export default router;