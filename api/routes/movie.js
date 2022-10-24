const express = require("express");
const mongoose  = require("mongoose");
const router = express.Router();
const Movie = require("../models/movie");

//GET
    router.get("/", (req, res, next) => {
    const getMovie = {
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        writer: req.body.writer,
        actor: req.body.actor,
        age: req.body.age
    };
    Movie.find({}, {
        find:getMovie
    }) .then(result => {
        res.status(201).json({
        message: "Top Movie",
        Movie: {
            title: result.title, 
            writer: result.writer,
            actor: result.actor,
            age: result.age,
            id: result.id, 
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
            title: result.title, 
            writer: result.writer,
                actor: req.body.actor,
                age: req.body.age
        })
        
        newMovie.save()
        .then(result =>{
        console.log(result);
        res.status(200).json({
        message: "peliculas por id",
        Movies: {
            title: result.title, 
            writer: result.writer,
            actor: result.actor,
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

    Movie.find({ 
        title: req.body.title,
        writer: req.body.writer,
        actor: req.body.actor,
        age: req.body.age
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0) {
    return res.status(406).json({
        message: "Movies is already cataloged"
    })
        }
        const newMovie = new Movie({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            writer: req.body.writer,
            actor: req.body.actor,
            age: req.body.age
            });
        
        newMovie.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Movies - update",
                Movies: {
                    title: result.title, 
                    writer: result.writer,
                    actor: result.actor,
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
    })
    .catch(err => {
        console.error(err);
        res.status(500).json({
            error:{
    message: "Unable to save movie with title" + req.body.title
        }
        })
    })
    });
    
//PATCH
    router.patch("/:movieId", (req, res, next) => {
            const movieId = req.params.movieId;

        const updatedMovie = {
            title: req.body.title,
            writer: req.body.writer,
            actor: req.body.name,
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
                    writer: result.writer,
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
                        writer: req.body.writer,
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
                            writer: result.writer,
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