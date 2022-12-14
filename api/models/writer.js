const mongoose = require("mongoose");

const writerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : {
        type : String,
        required : true
    },
    actor : {
        type : String,
        required : true
    }
});
module.exports = mongoose.model("Writer", writerSchema); 