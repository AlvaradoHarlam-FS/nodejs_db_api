const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : String,
    author : String,
    name : String,
    age : Number,
});

module.exports = mongoose.model("Movie", movieSchema); 