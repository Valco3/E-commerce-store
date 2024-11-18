import {stripe} from "../data/stripe.js"
import Order from "../models/order.model.js"

export const createCheckoutSession = async (req, res) => {
    try {
        const products = req.body
        if(!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({message: "Please provide an array of products"});
        }

        let totalAmount = 0;

        const lineItems = products.map(product => {
            const amount = product.price * 100;
            totalAmount += amount * product.quantity;

            return{
                price_data: {
                    currency: "bgn",
                    product_data:{
                        name: product.name,
                        images: [product.image]
                    },
                    unit_amount: amount
                }
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}? session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}? session_id={CHECKOUT_SESSION_ID}`,
            metadata: {
                userId: req.user._id.toString(),
                products: JSON.stringify(products.map(product => ({id: product.id, quantity: product.quantity, price: product.price})))
            }
             
        })
        res.status(200).json({id: session.id, totalAmount: totalAmount/100})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const checkoutSuccess = async (req, res) => {
    try {
        const {sessionId} = req.body;

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if(session.payment_status === "paid") {
            const products = JSON.parse(session.metadata.products);
            const newOrder = await Order.create({
                user:session.metadata.userId,
                products: products.map(product => ({
                    product: product.id,
                    quantity: product.quantity,
                    price: product.price
                })),
                totalAmount: session.amount_total / 100,
                stripeSessionId: session.id
            })

            await newOrder.save();
            res.status(200).json({message: "Order created successfully", orderId: newOrder._id, success: true});
        }
    } catch (error) {
        res.status(500).json({message: error.message})        
    }
}