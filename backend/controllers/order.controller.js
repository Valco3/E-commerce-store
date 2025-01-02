import Order from "../models/order.model.js"

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.json({orders})
    } catch (error) {
        res.status(200).json({message: error.message})
    }
}
export const changeOrderStatus = async (req, res) => {
    // try {
    //     const product = await Product.findById(req.params.id)
    //     if(product) {
    //         product.isFeatured = !product.isFeatured
    //         await product.save()
    //     }else {
    //         return res.status(404).json({message: "Product not found"})
    //     }
    //     res.json(product)
    // } catch (error) {
    //     res.status(500).json({message: error.message})
    // }
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