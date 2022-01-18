let mongoose = require("mongoose");
mongoose.pluralize(null);

let cartSchema = mongoose.Schema({
    userid : String,
    cart : [{item : String, price : Number}]
});

let cartModel = mongoose.model("User-Carts", cartSchema);

module.exports = cartModel;