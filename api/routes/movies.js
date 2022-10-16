const express = require("express");
const mongoose  = require("mongoose");
const router = express.Router();
const Movie = require("../models/movie");

//GET
    router.get("/", (req, res, next) => {
    const getMovie = {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
    author: req.body.author,
    name: req.body.name,
    age: req.body.age
    };
    Movie.find({}, {
        find:getMovie
    }) .then(result => {
        res.status(200).json({
        message: "Top Movie",
        Movies: {
            title: result.title, 
            author: result.author,
            name: result.name,
            age: result.age,
            id: result._id, 
            metadata : {
                method: req.method, 
                host: req.hostname
                }
    }
        });
    })
    .catch(err => {
        res.status(500).json({
        error:{
            message: err.message
        }
        })
    });
    });
// GET BY ID
    router.get("/:id", (req,res,next)=>{
        const id = req.params.id;
        const newMovie = new Movie({
        _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            author:req.body.author,
            name: req.body.name,
            age: req.body.age
        })
        
        newMovie.save()
        .then(result =>{
        console.log(result);
        res.status(200).json({
        message: "peliculas por id",
        Movies: {
            title: result.title, 
            author: result.author,
            name: result.name,
            age: result.age,
            id: result._id, 
            metadata : {
                method: req.method, 
                host: req.hostname
                }
            }
        })
    })
        .catch(err => {
        console.console.error(err.message);
        res.status(500).json({
            error: {
                message: err.message
            }
        })
        
        });
        });

//POST
router.post("/", (req, res, next) => {
    const newMovie = new Movie({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    name: req.body.name,
    age: req.body.age
    });

newMovie.save()
.then(result => {
    console.log(result);
    res.status(200).json({
        message: "Movies - update",
        Movies: {
            title: result.title, 
            author: result.author,
            name: result.name,
            age: result.age,
            id: result._id, 
            metadata : {
                method: req.method, 
                host: req.hostname
                }
            }
        })
    })
.catch(err => {
    console.log(err.message);
    res.status(500).json({
        error: {
            message: err.message
            }
        })
    });
});
//PATCH
    router.patch("/:movieId", (req, res, next) => {
            const movieId = req.params.moviesId;

        const updatedMovie = {
            title: req.body.title,
            author: req.body.author,
            name: req.body.name,
            age: req.body.age
        };

        Movie.updateOne({
            _id: movieId
        },{
            $set: updatedMovie
        }).then(result => {
            res.status(200).json({
                message: "Updated movie",
                Movies: {
                    title: result.title, 
                    author: result.author,
                    name: result.name,
                    age: result.age,
                    id: result._id, 
                    metadata : {
                        method: req.method, 
                        host: req.hostname
                        }
                }
            })
        })
            .catch(err => {
                res.status(500).json({
                    error: {
                        message: err.message
                        }
                    })
                });
            });
            //DELETE by ID
                router.delete("/:id", (req,res,next)=>{
                    const id = req.params.id;
                
                    const deleteMovie = {
                        title: req.body.title,
                        author: req.body.author,
                        name: req.body.name,
                        age: req.body.age,
                    id: req.body._id
                    };
                
                Movie.deleteOne({
                _id:id
                },{
                    deleteOne: deleteMovie
                })
                .then(result => {
                    res.status(200).json({
                        message: "peliculas delete",
                        Movies: {
                            title: result.title, 
                            author: result.author,
                            name: result.name,
                            age: result.age,
                            id: result._id, 
                            metadata : {
                                method: req.method, 
                                host: req.hostname
                                }
                    }
            })
        })
                .catch(err => {
                    res.status(500).json({
                        error:{
                            message: err.message
                        }
                    })
                });
                });


module.exports = router; 