const mongoose = require("mongoose")
module.exports.connectDb = () => {
    console.log(process.env.DB_URL)
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("mongodb connected suscessfully")
        })
        .catch((error) => {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        })
}