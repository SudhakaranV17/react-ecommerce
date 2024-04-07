const mongoose = require("mongoose");

// SCHEMA FOR DATABASE COLLECTION
const orderSchema = new mongoose.Schema({
    cartItems: Array,
    amount: String,
    status: String,
    createdAt: Date
})

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel