const mongoose = require("mongoose")
module.exports.connectDb = () => {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("mongodb connected suscessfully")
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        })
}