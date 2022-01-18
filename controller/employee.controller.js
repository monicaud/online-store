let employeeModel = require("../models/employee.model");
let requestModel = require("../models/request.model");
let orderModel = require("../models/order.model");
let ticketModel = require("../models/ticket.model");

let getOrder = (request,response)=> { //change id to be session storage value of id
    let order = orderModel.findOne({_id:1}, (err,data)=> {
        if(!err) {
            console.log("Order found");
            response.json(data);
        } else {
            console.log("Couldn't find order");
        }
    });
};

let empSendRequest = (request, response)=>{
    //tell admin to increase product quantities
    let info = request.body;
    //is there gonna be a table with requests from the employees to the admin

    requestModel.insertMany({_id:info.id, request: info.request}, (err, data)=>{
        if(!err) {
            console.log(data);
        }
        else{
            console.log(err);
        }
    });

}

let empUpdateOrder = (request, response)=>{
    //view orders, change status to shipped, out for delivery, delivered, cancelled
    //if cancelled, refund user, and let them know the reason
    let info = request.body;
    console.log("controller: ");
    console.log(info);
 
    if(info.status == "Cancelled"){
        orderModel.updateOne({_id:info.orderid}, {$set:{status: info.status, message:info.reason}}, (err,data)=>{
            if(!err){
                // response.json(data);
                console.log(data);
            } else {
                console.log(err);
            }
        });
    } else {
        orderModel.updateOne({_id:info.orderid}, {$set:{status: info.status, message:""}}, (err,data)=>{
            if(!err){
                // response.json(data);
                console.log(data);
            } else {
                console.log(err);
            }
        });
    }
}

let empUnlockUser = (request, response) => {
    let thisusername = request.params.username;
    ticketModel.deleteOne({username: thisusername}, (err,data) => {
        if(!err){
            response.json(data);
            console.log(data);
        }else{
            console.log(err);
        }
    });
}

let empGetTickets = (request, response) => {
    ticketModel.find({}, (err, data) => {
        if(!err) {
            response.json(data);
            console.log(data);
        } else {
            console.log(err);
        }
    });
}

let empEditProfile = (request, response) => {
    let profile = request.body;
    console.log("emp edit profile");
    console.log(profile);
    employeeModel.updateOne({_id: profile.empid, password: profile.oldpass}, {$set: {password: profile.newpass}}, (err,data) => {
        if(!err) {
            console.log(data);
            response.json(data);
            
        } else {
            response.json(err);
        }
    });
}

let getCredentials = (request, response) => {
    let info = request.body;
    console.log(info);
    if(info != null) {
        console.log("in creds checking ");
        console.log(info);
        employeeModel.findOne({$and: [{_id: info.empID},{password: info.pass}]}, (err,data) => {
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

let getOrders = (request, response)=>{
    orderModel.find({}, (err,data)=> {
        if(!err) {
            console.log("Orders found");
            response.json(data);
        } else {
            console.log("Couldn't find orders");
            response.json(err);
        }
    });
}

let getUserName = (request, response)=> {
    let user = request.body;
    console.log("Getting user");
    console.log(user.id);
    employeeModel.findOne({_id: user.id}, (err,data) => {
        if(!err) {
            console.log(data);
            response.json(data);
        } else {
            console.log(err);
            console.error("oh no");
            
        }
    });
}

module.exports = {empEditProfile, empSendRequest, empUpdateOrder, empUnlockUser, empGetTickets, getCredentials, getUserName, getOrder, getOrders};