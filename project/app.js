const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

 //import routers
 const userRouter = require("./src/routes/user.routes.js");

console.log("agya maie");
// routes declaration
app.use("/user", userRouter)

module.exports = app;