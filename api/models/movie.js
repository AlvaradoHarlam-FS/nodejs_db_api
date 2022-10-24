const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {
        type : String,
        required : true
    },
    writer : {
        type : String,
        required : true
    },
    actor : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    }
});
module.exports = mongoose.model("Movie", movieSchema); 