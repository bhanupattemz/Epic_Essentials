const mongoose = require("mongoose")
const product = require("../models/productModel")
const { products } = require("./helper")
const { connectDb } = require("../config/database")

// Load environment variables from .env file
require('dotenv').config({ path: "../config/.env" })
connectDb()
async function insertProducts() {
    console.log(products[0])
    await product.deleteMany({})
    const imgs = [
        {
            "public_id": "default",
            "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1722964305/Epic%20Essentials/g9cdelqlo3z095om37rt.jpg"
        },
        {
            "public_id": "default",
            "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723724169/Epic%20Essentials/xx3tpmbooyiqxdbljlg4.png"
        },
        {
            "public_id": "default",
            "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723484775/Epic%20Essentials/awkkz5zhujgqccqjdsum.webp"
        },
        {
            "public_id": "default",
            "url": "https://res.cloudinary.com/dmvxvzb5n/image/upload/v1723484031/Epic%20Essentials/muud9igvsksbrdvbgsse.jpg"
        }
    ]
    products.forEach((item) => {
        const rand = Math.floor(Math.random() * 4 + 1)
        item.images = []
        for (let i = 0; i < rand; i++) {
            item.images.push(imgs[Math.floor(Math.random() * 4 + 1)])
        }
    })
    const data = await product.insertMany(products)
    console.log(products)
}
insertProducts()
