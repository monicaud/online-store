//Monica start 9-14-2021
let mongoose = require("mongoose");

let requestSchema = mongoose.Schema({
    _id : Number,
    request: String
});

let requestModel = mongoose.model("Request", requestSchema);
module.exports = requestModel;
//Monica end