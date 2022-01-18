let mongoose = require("mongoose"); //load the mongoose module
mongoose.pluralize(null); //avoid postfix s

let employeeSchema = mongoose.Schema({
    _id:Number,
    name:String,
    //emailID:{type:String, unique:true},
    password:String
});

//create the employee model. 1st param is model name | 2nd param is schema
let employeeModel = mongoose.model("Employee", employeeSchema);

module.exports = employeeModel; //export the model, to be imported into controller