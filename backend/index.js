const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, 'config', "config.env") })


// CORS 
const cors = require("cors")
// DATABASE
const db = require("./config/connectDB")
// ROUTES
const products = require("./routes/products")
const order = require("./routes/order")

// CALL DATABASE BEFORE SERVER ROUTES
db();

// MIDDLEWARE to tell the EXPRESS to "EXPECT the DATA as JSON"
app.use(express.json())
app.use(cors())

// API ROUTES SETUP
app.use("/api/v1/", products);
app.use("/api/v1/", order);

// MAIN SERVER
app.listen(process.env.PORT, () => {
    console.log("listening on port: 8000");
})