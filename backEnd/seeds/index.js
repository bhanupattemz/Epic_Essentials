const mongoose = require("mongoose")
const product = require("../models/productModel")
const { products } = require("./helper")
const { connectDb } = require("../config/database")

// Load environment variables from .env file
require('dotenv').config({ path: "../config/.env" })
connectDb()
async function insertProducts() {
    await product.deleteMany({})
    products.forEach((item)=>item.user="66855fdc02bbc771b25cea42")
    const data=  await product.insertMany(products)
    console.log(products)
}
insertProducts()
