const express = require("express")
const ExpressError = require("./utils/ExpressError")
const Session = require("express-session")
const passPort = require("passport")
const passPortLocal = require("passport-local")
const User = require("./models/userModel")
require('dotenv').config({ path: "./backEnd/config/.env" })
const MongoStore = require("connect-mongo")
const path = require("path")

//Route imports


const productsRoute = require("./routes/products")
const userRoute = require("./routes/user")
const adminRoute = require("./routes/adminRoute")
const reviewRoute = require("./routes/reviewRoute")
const orderRoute = require("./routes/orderRoute")
const cartRoute = require("./routes/cartRoute")
const paymentRoute = require("./routes/paymentRoute")
const app = express();


if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


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
        secure: process.env.NODE_ENV === 'production', 
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
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

app.use("api/v1/:no", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404))
})

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = "some thing wents Wrong";
    res.status(statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    })
})

module.exports.app = app