let mongoose = require("mongoose");

mongoose.pluralize(null);

let productSchema = mongoose.Schema({
    _id: Number,
    name : String, 
    price : Number,
    url : String
});

let productModel = mongoose.model("Products", productSchema);
module.exports = productModel;