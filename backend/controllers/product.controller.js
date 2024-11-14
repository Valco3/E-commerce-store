import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({products})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
}

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await Product.find({isFeatured: true}).lean();
        if(!featuredProducts){
            return res.status(404).json({message: "No featured products found"});
        }

        res.json(featuredProducts)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createProduct = async (req, res) => {
    
}