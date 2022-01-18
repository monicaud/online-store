let mongoose = require("mongoose");

mongoose.pluralize(null);

let adminSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
});

let adminmodel = mongoose.model("Admin", adminSchema);
module.exports = adminmodel;
