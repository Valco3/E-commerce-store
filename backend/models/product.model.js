import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    category: {
        type: String,
        required: [true, "Please add a category"]
    },
    description: {
        type: String,
        default: "",
        required: [true, "Please add a description"]
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        min: 0
    },
    quantity: {
        type: Number,
        required: [true, "Please add a quantity"],
        min: 0
    },
    image: {
        type: String,
        default: "",
        required: [true, "Please add an image"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    }

},{timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product