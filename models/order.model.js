let mongoose = require("mongoose");
mongoose.pluralize(null);

let orderSchema = mongoose.Schema({
    _id : Number,
    status: String,
    message : String
});

let orderModel = mongoose.model("Orders", orderSchema);

module.exports = orderModel;