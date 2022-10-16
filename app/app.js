const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const authorsRoutes = require('../api/routes/authors');
const movieRoutes = require('../api/routes/movies');

// middleware for logging
app.use(morgan("dev"));
//parsing
app.use(express.urlencoded({ extended: true }));
//middleware that all request json
app.use(express.json());

//middleware to handle the cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH,');
    }
    next();
})

app.get('/', (req, res, next) => {
    res.status(201).json({
        message: 'Service Success URL', 
    method: req.method
    })
})

app.use("/authors" ,authorsRoutes );
app.use("/movie" ,movieRoutes );

// add middleware to handle errors and bad  url 
app.use((req, res, next) => {
    const error = new Error('Service unavailable');
    error.status = 404;
    next(error);
 });
 
 app.use((error, req, res, next) => {
 res.status(error.status || 500).json({ 
     error: {
     message: error.message,
     status: error.status,
     method: req.method,   
 },
 });
 });

mongoose.connect(process.env.mongoDBURL, (err) => {
    if (err) {
        console.error("Error:" , err.message);
    } else {
console.log("MongoDb connection Successful");
    }
});

module.exports = app;