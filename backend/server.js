require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const courseRoutes = require('./routes/course')

//express app initialization
const app = express()

//Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes for test
app.use("/api/courses", courseRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening on port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err);
    })