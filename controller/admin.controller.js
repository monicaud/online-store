  
/** This file allows admin users to edit various qualities about
*   registered employees.
*/

let adminModel = require("../models/admin.model");
let ticketModel = require("../models/ticket.model");
let productModel = require("../models/product.model");

let addEmp = (request, res) => {
    //tell admin to increase product quantities
    let info = request.body;
    let emp = new adminModel({
        name : info.name,
        email : info.email,
        password : info.pass
    })

    console.log(emp); 

    adminModel.insertMany(emp, (err, result) => {
        if(!err) {
            res.send("employee added");
        } else {
            res.send(err);
        }
    });
};

let deleteEmp = (request, res) => {
    //tell admin to increase product quantities
    console.log(request.body);
    let info = request.body;

    adminModel.deleteOne({name:info.name}, (err, result) => {
        if(!err) {
            res.send("employee deleted");
        } else {
            res.send(err);
        }
    });
};

let empGetTickets = (request, response) => {
    ticketModel.find({}, (err, data) => {
        if(!err) {
            response.json(data);
            console.log(data);
        } else {
            console.log(err);
        }
    });
};


let getCredentials = (request, response) => {
    let info = request.body;
    console.log(info);
    if(info != null) {
        console.log("in creds checking ");
        console.log(info);
        adminModel.findOne({name:info.name, password:info.pass}, (err,data) => {
            if(!err) {
                console.log("in get creds");
                console.log(data);
                response.json(data);
            } else {
                console.log(err);
                console.error("oh no");
                
            }
        });
    }
}

let addProduct = (request, response) =>{
    let info = request.body;
    console.log("in add product");
    //info.pid info.pname info.pprice 
    productModel.insertMany({_id: info.pid, name: info.pname, price:info.pprice, url:info.purl}, (err,data)=>{
        if(!err){
            console.log(data);
            response.json(data);
        }
        else{
            console.log(err);
        }
    });
}

let deleteProduct = (request, res) => {
    //delete products
    console.log(request.body);
    let info = request.body;

    productModel.deleteOne({_id:info.pid}, (err, result) => {
        if(!err) {
            res.send("product deleted");
        } else {
            res.send(err);
        }
    });
};

let updateProduct = (request, response )=> {
    let info = request.body;
    console.log(info);
    productModel.updateOne({_id:info.pID}, {$set: {name: info.pName, price: parseFloat(info.newPrice).toFixed(2)}}, (err,data) => {
        if(!err) {
            console.log("Product updated successfully");
            response.json(data); 
        } else {
            console.log("Could not update product...");
        }
    })
};

let getUserName = (request, response)=> {
    let user = request.body;
    console.log("Getting user");
    console.log(user.name);
    adminModel.findOne({name: user.name}, (err,data) => {
        if(!err) {
            console.log(data);
            response.json(data);
        } else {
            console.log(err);
            console.error("oh no");
        }
    });
}

module.exports = {addEmp, deleteEmp ,empGetTickets, getCredentials, getUserName, addProduct, deleteProduct, updateProduct};