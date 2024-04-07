const mongoose = require("mongoose")


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((con) => {
        console.log("mongodb connected successfully...Host: " + con.connection.host);
    })
}
module.exports = connectDatabase;