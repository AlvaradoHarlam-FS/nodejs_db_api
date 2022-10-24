const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const writer = require('../api/routes/writer');
const movie = require('../api/routes/movie');
const cors = require('cors');

// middleware for logging
app.use(morgan("dev"));
//parsing
app.use(express.urlencoded({ extended: true }));
//middleware that all request json
app.use(express.json());
// use cors middleware
app.use(cors());

//middleware to handle the cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH,");
    }
    next();
})

app.get('/', (req, res, next) => {
    res.status(201).json({
        message: 'Service Success URL', 
    method: req.method
    })
})

app.use("/writer" ,writer );
app.use("/movie" ,movie );

// add middleware to handle errors and bad  url 
app.use((req, res, next) => {
    const error = new Error('Service unavailable');
    error.status = 404;
    next(error);
 });
 //respnse json middleware 
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
mongoose.connect('mongodb://localhost:27017/library', (err) => {
    if (err){
        console.log("Error: ", err.message);
    } else {
        console.log("Mongodb connection successful");
    }
 });
module.exports = app;