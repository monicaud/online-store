let mongoose = require("mongoose");
mongoose.pluralize(null);

let userSchema = mongoose.Schema({
    _id : Number,
    name: String,
    password : String,
    email : String,
    funds : Number
});

//create the user model
//1st param is collection name | 2nd param is schema
let userModel = mongoose.model("Users", userSchema);

module.exports = userModel;