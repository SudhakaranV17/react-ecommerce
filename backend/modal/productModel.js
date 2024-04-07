/***
 * MODALS : to interact with database
 * each endpoint points to a collection in a database
 * 
 * PRODUCT MODAL 
 */
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    desc: String,
    rating: String,
    images: [
        {
            image: String
        }
    ],
    category: String,
    seller: String,
    numOfReviews: String,
    created: Date
})

// MODAL must a single word always in mongoose like 'product' , 'order'
// collection name: 'product'
const productModal = mongoose.model('product', productSchema);
module.exports = productModal;