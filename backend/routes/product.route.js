import express from "express";
import {protectRoute, adminRoute} from "../middleware/auth.middleware.js"
import {getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getReccomendations, getProductsByCategory, toggleFeatured} from "../controllers/product.controller.js";


const router = express.Router();

router.get("/", protectRoute, adminRoute , getAllProducts)
router.get("/featured", getFeaturedProducts)
router.get("/reccomendations", getReccomendations)
router.get("/category/:category", getProductsByCategory)
router.post("/", protectRoute, adminRoute, createProduct)
router.patch("/:id", protectRoute, adminRoute, toggleFeatured)
router.delete("/:id", protectRoute, adminRoute, deleteProduct)

export default router;