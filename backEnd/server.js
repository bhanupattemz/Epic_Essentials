const { app } = require("./app");
const { connectDb } = require("./config/database")

// Load environment variables from .env file
require('dotenv').config({ path: "./backEnd/config/.env" })
connectDb()


const Server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}/api/v1/products`);
});


process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err}`);
    console.log("Shutting down the server due to rejection");
    if (Server) {
        Server.close((closeErr) => {
            if (closeErr) {
                console.error(`Error while closing the server: ${closeErr}`);
                process.exit(1);
            } else {
                process.exit(1);
            }
        });
    } else {
        console.error("Server instance is not defined");
        process.exit(1);
    }
});