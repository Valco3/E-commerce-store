import {stripe} from "../data/stripe.js"
import Order from "../models/order.model.js"
import Product from "../models/product.model.js"
import User from "../models/user.model.js"

export const createCheckoutSession = async (req, res) => {
    try {
        const {products} = req.body
        if(!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({message: "Please provide an array of products"});
        }

        let reservedProducts = []

        for (const product of products) {
            const dbProduct = await Product.findById(product._id);
            if (!dbProduct) {
                return res.status(404).json({ message: `Продукт с ID ${product._id} не е намерен` });
            }
            if (dbProduct.stockQuantity < product.quantity) {
                return res.status(400).json({ message: `Недостатъчна наличност на продукта ${dbProduct.name}` });
            }

            
            dbProduct.quantity -= product.quantity;

            reservedProducts.push({_id:dbProduct._id, quantity: product.quantity});

            await dbProduct.save();
        }

        const user = await User.findById(req.user._id);
        user.reservedProducts.push(...reservedProducts);
        await user.save();

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = Math.round(product.price * 100);
            totalAmount += amount * product.quantity;

            return{
                price_data: {
                    currency: "bgn",
                    product_data:{
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                },
                quantity: product.quantity || 1
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: process.env.SAVE_MODE === "local" ? `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}` : "http://192.168.0.102:5173/purchase-success?session_id={CHECKOUT_SESSION_ID}",
            // cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            cancel_url: process.env.SAVE_MODE === "local" ? `${process.env.CLIENT_URL}/purchase-fail?session_id={CHECKOUT_SESSION_ID}` : "http://192.168.0.102:5173/purchase-fail?session_id={CHECKOUT_SESSION_ID}",
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(products.map((product) => ({id: product._id, quantity: product.quantity, price: product.price, name: product.name}))),
                email: req.user.email
            }
             
        })
        res.status(200).json({id: session.id, totalAmount: totalAmount/100})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const checkoutSuccess = async (req, res) => {
    try {
        const {sessionId, user} = req.body;
        // console.log(sessionId, user)

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "paid") {
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                user:session.metadata.userId,
                userName: user.name,
                products: products.map(product => ({
                    
                    product: product.id,
                    productName: product.name,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: sessionId
            })

            await newOrder.save();

            const userDB = await User.findById(user._id);
            // console.log(userDB)
            userDB.reservedProducts = [];
            await userDB.save();

            res.status(200).json({message: "Order created successfully", orderId: newOrder._id, success: true});
        }
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}

export const checkoutFail = async (req, res) => {
    try {
        const {sessionId, user} = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "unpaid") {
            console.log("Payment failed")
            
            const userDB = await User.findById(user._id);
            // console.log(userDB)
            for (const reservedProduct of userDB.reservedProducts) {
                console.log(reservedProduct._id)
                const dbProduct = await Product.findById(reservedProduct._id);
                console.log(dbProduct)
                dbProduct.quantity += reservedProduct.quantity;
                
                await dbProduct.save();
            }
            userDB.reservedProducts = [];
            await userDB.save();
            res.status(200).json({message: "Order failed successfully"});
        }
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}