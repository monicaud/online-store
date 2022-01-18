let ticketModel = require("../models/ticket.model");
let cartModel = require("../models/user-cart.model");
let productModel = require("../models/product.model");
let url = require('url');

/**
 * Controller function to access the db cluster and add a 
 * new ticket to the database Tickets collection. 
 * 
 * @author Alex Matsukawa
 */
let saveTicketRequest = (req, res) => {
    let ticketData = req.body;
    let ticket = new ticketModel({
        name : ticketData.name,
        email : ticketData.email,
        username : ticketData.username,
        description : ticketData.desc
    })
    //console.log(ticket); //-> debug line
    ticketModel.insertMany(ticket, (err, result) => {
        if(!err) {
            res.send("Ticket saved successfully!");
        } else {
            res.send(err);
        }
    });
};

let saveCart = (req, res) => {
    let cartData = req.body;
    //console.log(cartData);
    let newCart = new cartModel({
        userid : cartData.userid,
        cart : cartData.cart
    })
    //console.log(newCart);
    cartModel.insertMany(newCart, (err, result) => {
        if(!err) {
            res.send("Cart saved successfully!");
        } else {
            res.send(err);
        }
    });
};

let updateCart = (req, res) => {
    let cart = req.body;
    cartModel.updateOne({userid: cart.userid}, {$set: {cart: cart.cart}}, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    });
};

let getUserCarts = (req, res) => {
    cartModel.find({}, (err, data) => {
        if(!err) {
            res.json(data);
        } else {
            res.json(err);
        }
    });
};

let deleteCartItem = (req, res) => {
    let params = req.body;
    //console.log(params);
    cartModel.updateOne({userid: params.userid}, {$pull: {cart: {item: params.item, price: params.price}}}, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    });
};

let deleteCart = (req, res) => { 
    let ucid = req.params.ucid;
    //console.log(ucid);
    cartModel.deleteOne({userid : ucid}, (err, result) => {
        if(!err) {
            res.send(result);
        } else {
            res.send(err);
        }
    })
}

let getProducts = (request, response) =>{
    productModel.find({}, (err, data) => {
        if(!err) {
            console.log(data);
            response.json(data);
            
        } else {
            console.log(err);
        }
    });
}


module.exports = {saveTicketRequest, saveCart, updateCart, deleteCartItem, getUserCarts, deleteCart, getProducts};