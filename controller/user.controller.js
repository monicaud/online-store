let userModel = require("../models/user.model"); //import the user model

let addUser = (request, res) => {
    //tell admin to increase product quantities
    let info = request.body;
    var min = Math.ceil(0);
    var max = Math.floor(10000000);
    let randID = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(randID);
    let emp = new userModel({
        _id: randID,
        name : info.name,
        email: info.email,
        password: info.pass,
        funds : 200
    })
    //ID?????
  

    userModel.insertMany(emp, (err, result) => {
        if(!err) {
            res.send("user added");
        } else {
            res.send(err);
        }
    });
};

let getCredentials = (request, response) => {
    let info = request.body;
    console.log(info);
    if(info != null) {
        console.log("in creds checking ");
        userModel.findOne({_id:info.userid, password:info.pass}, (err,data) => {
            if(!err) {
                console.log("in get creds");
                console.log(data);
                response.json(data);
            } else {
                console.log(err);
                console.error("oh no");
                
            }
        })
    } 
}

let loadUserInfo = (request,response) => {
    let info = request.body;
    let userID = parseInt(info.id); 
    userModel.findOne({_id:userID}, (err,data)=>{
        if(!err){
            response.json(data);
        } else {
            console.log(err);
        }
    });
};

let getUserName = (request, response)=> {
    let user = request.body;
    console.log("Getting user");
    console.log(user.id);
    userModel.findOne({_id: parseInt(user.id)}, (err,data) => {
        if(!err) {
            console.log(data);
            response.json(data);
        } else {
            console.log(err);
            console.error("oh no");
            
        }
    });
}

let updateUserInfo = (request,response) => {
    let info = request.body;
    console.log(info);
    //get their information from the form and update it in the database
    //add "address", "city", "state", "zipcode" to the set later
    userModel.updateOne({_id: parseInt(info.id)}, {$set: {name:info.name, password:info.password, email:info.email}}, (err,data) => {
        if(!err) {
            console.log("User updated successfully");
            response.json(data); 
        } else {
            console.log("Could not update User");
        }
    })
};

let updateFunds = (req, res) => {
    let info = req.body;
    console.log(info);
    userModel.updateOne({_id:info.id}, {$set: {funds:info.funds}}, (err,data) => {
        if(!err) {
            console.log("Funds updated successfully");
            res.json(data); 
        } else {
            console.log("Could not update User funds...");
        }
    })
}

let addUserFunds = (request,response)=>{
    let addedFunds = request.body;
    let userID = addedFunds.id;
    console.log("line 36 " + addedFunds.amount);
    //get current funds
    userModel.findOne({_id:userID}, (err,data) => {
        if(!err){
            console.log("line 41 " + parseInt(data.funds));
            let currentFunds = data.funds;
            //response.json(data);
            console.log(parseInt(addedFunds.amount))
            let newFunds = parseFloat(currentFunds) + parseFloat(addedFunds.amount);
            console.log(newFunds);
            userModel.updateOne({_id:userID}, {$set: {funds: parseFloat(newFunds).toFixed(2)}}, (err,data)=>{
                if(!err){
                    console.log("Funds added successfully");
                    response.json(data);
                }else{
                    console.log("Could not add funds");
                }
            });
        }
    });
};


module.exports = {addUser,getCredentials, loadUserInfo, updateUserInfo, addUserFunds, getUserName, updateFunds};
