const orderModel = require("../modal/orderModal")
const productModel = require("../modal/productModel")

// Create order - /api/v1/order
exports.createOrder = async (req, res, next) => {
    // console.log(req.body, "data");
    const cartItems = req.body;
    const amount = Number(cartItems.reduce((acc, item) => (acc + item.product.price * item.quantity), 0)).toFixed(2)
    const status = "pending";
    const order = await orderModel.create({ cartItems, amount, status });

    // updating product stock after orde placed
    for (const item of cartItems) {
        const product = await productModel.findById(item.product._id);
        product.stock = product.stock - item.quantity;
        await product.save();
    }


    res.json({
        success: true,
        order: order,
        message: "order success"
    })
}