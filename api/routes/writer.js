const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Writer = require("../models/writer")
const Messages = require("../../messages/messages");
const {findWriter, postWriter} = require("../../tes/tes");
const writer = require("../models/writer");

//POST
router.post("/", (req, res) => { 

findWriter({ title: req.body.title, actor: req.body.actor })
.then((writer) => {
    console.log(writer);
    if (writer.length > 0) {
        res.status(406).json
        ({
            message: `${result[0].title} already cataloged`});
    } else {
        const newWriter = new Writer({
            title: req.body.title,
            actor: req.body.actor,
        });
        postWriter(newWriter)
        .then((writer) => {
            console.log(writer);
            res.status(201).json({
                messages: "Writer saved",
                writer: {
                    title: writer.title,
                    actor: writer.actor,
                    metadata: {
                        method: req.method,
                        host: req.hostname,
                    }
                },
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: {
                    message: "Artist not created"
                },
            });
        });
    }
})
.catch(err => {
    console.log(err);
    res.status(500).json({
        error: {
            message: "Artist not created"
            }
        })
    })
});
    //PATCH
    router.patch("/:writerId", (req, res, next) => {
        const writerId = req.params.writerId;
    const updatedWriter = {
        title: req.body.title,
        writer: req.body.writer,
        actor: req.body.name,
        age: req.body.age
    };

    Writer.updateOne({
        _id: writerId
    },{
        $set: updatedWriter
    })
    .populate("movie")
    .exec()
    .then(result => {
        if(!writer){
            console.log(writer);
            return res.status(404).json({
                messages: Messages.writer_not_updated
        })
    }else {
        res.status(200).json({
            message: "Updated movie",
                metadata : {
                    method: req.method, 
                    host: req.hostname
                }
            })
        }
    })
        .catch(err => {
            res.status(500).json({
                error: {
                    message: err.message
                    }
                })
            });
        });

//GET
    router.get("/", (req, res, next)=>{
        const getWriter = {
            title: req.body.title,
            writer: req.body.writer,
            actor: req.body.actor,
            age: req.body.age,
            _id: mongoose.Types.ObjectId()
        };
        
        Writer.find({}, {
        find:getWriter
        }) .then(result => {
        res.status(200).json({
            message: "All Movies Found",
            writer:{
                title:result.title,
                writer:result.writer,
                actor:result.actor,
                age:result.age,
                id:result._id
            },
            metadata:{
                host:req.hostname,
                method:req.method
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
//Get by ID
router.get("/:writerId", (req, res, next) => { 
const writerId = req.params.writerId;
    Writer.findById(writerId)
        .select("name _id")
        .populate("movie", "title actor age")
        .exec()
        .then(writer => {
            if(!writer) {
            console.log("writer");
            return res.status(404).json({
                message: "writer not found"
        })      
    }
res.status(201).json({
    writer: "writer not found"
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

//delete writer by Id
    router.delete("/:writerId", (req, res,) => { 
        const writerId = req.params.writerId;
        Writer.deleteOne({
            _id: writerId
        })
        .exec()
        .then(result => {
            res.status(200).json({
        message : "Writer deleted successfully.",
    request : {
        method : "GET",
        url: "http://localhost:3000/writer/" + writerId
    }
    
                })      
                })
            .catch(err => {
                res.status(500).json({
                    error: {
                        message: err.message
                    }
            })
        })
    });
module.exports = router; 