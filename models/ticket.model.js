let mongoose = require('mongoose');
mongoose.pluralize(null);

let ticketSchema = mongoose.Schema({
    name : String,
    email : String,
    username : String,
    description : String
});

let ticketModel = mongoose.model("Tickets", ticketSchema);

module.exports = ticketModel;