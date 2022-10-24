const mongoose = require("mongoose");
const writer = require("../api/models/writer");

const connect = () => {
    mongoose.connect('mongoose://localhost:27017/testbooks', (err) => {
        if (err)console.log('error:' , err.message);
console.log("Connected")
}
    )
}
const postWriter = async (newWriter) => {
    console.log("Saving real Movie");
    return await newWriter.save();
};

const findWriter = async (object) => {
    console.log("Find real Writer");
return await writer.find(object).exec();
};

const disconnect = () => {
    console.log("Disconnecting");
    mongoose.connection.close();
};
module.exports = {
    connect, findWriter, postWriter, disconnect
};