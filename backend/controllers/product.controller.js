import Product from "../models/product.model.js";
import {upload} from "../data/multer.js";
import fs from "fs";
import { get } from "http";

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

const uploadImage = async (req, res) => {
    return new Promise((resolve, reject) => {
        upload.single("image")(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            req.body.image = req.file.filename
            resolve();
        });
    });
}

export const createProduct = async (req, res) => {
    try {
        await uploadImage(req, res)

        const {name, category, description, price, quantity, image} = req.body;
        console.log(image)
        
        const product = await Product.create({
            name,
            category,
            description,
            price,
            quantity,
            image: "./images/" + image
        })

        res.status(201).json(product)
    } catch (error) {
        fs.unlinkSync("./images/" + req.body.image)
        res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product) {
            return res.status(404).json({message: "Product not found"})
        }

        if(product.image) {
            fs.unlinkSync("./backend/" + product.image)
            console.log("Image deleted")
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({message: "Product deleted"})

    } catch (error) {    
        res.status(500).json({message: error.message})
        
    }
}

export const getReccomendations = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {$sample: {size: 3}},
            {$project: {
                _id: 1,
                name: 1,
                image: 1,
                description: 1,
                price: 1,
                quantity: 1
            }
        }
        ])
        res.json(products)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProductsByCategory = async (req, res) => {
    try {
        const {category} = req.params
        const products = await Product.find({category})
        res.json({products})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const toggleFeatured = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(product) {
            product.isFeatured = !product.isFeatured
            await product.save()
        }else {
            return res.status(404).json({message: "Product not found"})
        }
        res.json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}