import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;

        const existingItem = user.cartItems.find(item => item.id === productId);
        if(existingItem) {
            existingItem.quantity += 1;
        }else{
            user.cartItems.push(productId);
        }

        await user.save()
        res.json(user.cartItems)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const removeFromCart = async (req, res) => {

    try {
        const {id:productId} = req.params;
        const user = req.user;
    
        user.cartItems = user.cartItems.filter(item => item.id !== productId);
        await user.save()
        res.json(user.cartItems)        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user
        const existingItem = user.cartItems.find(item => item.id === productId);
        
        //TO DO - CHECK IF QUANTITY IS VALID
        

        if(existingItem) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter(item => item.id !== productId);
                await user.save()
                res.json(user.cartItems)
            }

            existingItem.quantity = quantity;
            await user.save()
            res.json(user.cartItems)
        }else{
            res.status(404).json({message: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in: req.user.cartItems}})
        const cartItems = []
        products.forEach(product => {
            const item = req.user.cartItems.find(item => item.id === product.id)
            cartItems.push({...product.toObject(), quantity: item.quantity})
        })

        res.json(cartItems)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}