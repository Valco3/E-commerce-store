import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
    try {
        const {productId} = req.body;
        const user = req.user;
        const existingItem = user.cart.find((item )=> item.id === productId);
        if(existingItem) {
            existingItem.quantity += 1;
        }else{
            user.cart.push(productId);
        }

        await user.save()
        res.json(user.cart)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const removeFromCart = async (req, res) => {

	try {
		const { productId } = req.body;
		const user = req.user;
		if (!productId) {
			user.cart = [];
		} else {
			user.cart = user.cart.filter((item) => item.id !== productId);
		} 
		await user.save();
		res.json(user.cart);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

export const updateQuantity = async (req, res) => {
    try {
        const {id:productId} = req.params;
        const {quantity} = req.body;
        const user = req.user
        const existingItem = user.cart.find(item => item.id === productId);
        
        //TO DO - CHECK IF QUANTITY IS VALID
        

        if(existingItem) {
            if(quantity === 0) {
                user.cart = user.cart.filter(item => item.id !== productId);
                await user.save()
                res.json(user.cart)
            }

            existingItem.quantity = quantity;
            await user.save()
            res.json(user.cart)
        }else{
            res.status(404).json({message: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCartProducts = async (req, res) => {
    try {
        const products = await Product.find({_id:{$in: req.user.cart}})
        const cart = []
        products.forEach(product => {
            const item = req.user.cart.find(item => item.id === product.id)
            cart.push({...product.toObject(), quantity: item.quantity})
        })

        res.json(cart)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const clearCart = async (req, res) => {
    try {
        req.user.cart = []
        await req.user.save()
        res.json(req.user.cart)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}