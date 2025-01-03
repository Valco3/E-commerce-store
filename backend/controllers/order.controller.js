import Order from "../models/order.model.js"

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json({orders})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id})
        res.json({orders})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
}

export const changeOrderStatus = async (req, res) => {
    const {status, orderId} = req.body
    console.log(status, orderId)    
    try {
        const order = await Order.findById(orderId)
        if(order) {
            order.status = status
            await order.save()
            res.json(order)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}