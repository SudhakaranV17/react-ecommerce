const productModel = require("../modal/productModel");

// route("/products/")
exports.getProducts = async (req, res, next) => {
    // to extract data
    const products = await productModal.find({});
    res.json({
        success: true,
        products,
        message: "get products working"
    })
}


// route("/products/:id")
exports.getSingleProduct = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id)
        res.json({
            success: true,
            product,
            message: "get products success"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        })
    }

}

