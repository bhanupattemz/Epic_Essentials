const express = require("express")
const ExpressError = require("./utils/ExpressError")
const Session = require("express-session")
const passPort = require("passport")
const passPortLocal = require("passport-local")
const User = require("./models/userModel")
require('dotenv').config({ path: "./backEnd/config/.env" })
const MongoStore = require("connect-mongo")
const cors=require("cors")

//Route imports
const productsRoute = require("./routes/products")
const userRoute = require("./routes/user")
const adminRoute = require("./routes/adminRoute")
const reviewRoute = require("./routes/reviewRoute")
const orderRoute = require("./routes/orderRoute")
const cartRoute=require("./routes/cartRoute")
const paymentRoute=require("./routes/paymentRoute")
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}));

const store = MongoStore.create({
    mongoUrl: process.env.DB_URL,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});
const sessionConfig = {
    store,
    name: 'session',
    secret: process.env.SESSION_SECRET || 'thisIsSecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(Session(sessionConfig))

app.use(passPort.initialize());
app.use(passPort.session())
passPort.use(new passPortLocal(User.authenticate()));
passPort.serializeUser(User.serializeUser())
passPort.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use("/api/v1", userRoute)
app.use("/api/v1", productsRoute)
app.use("/api/v1/admin", adminRoute)
app.use("/api/v1", reviewRoute)
app.use("/api/v1", orderRoute)
app.use("/api/v1", cartRoute)
app.use("/api/v1", paymentRoute)

app.use("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "some thing wents Wrong";
    res.status(statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
})

module.exports.app = app