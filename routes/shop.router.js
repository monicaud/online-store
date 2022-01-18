let express = require('express');
let router = express.Router();

let shopController = require("../controller/shop.controller");

router.post("/saveTicket", shopController.saveTicketRequest);
router.post("/saveCart", shopController.saveCart);
router.put("/updateCart", shopController.updateCart);
router.put("/deleteCartItem", shopController.deleteCartItem);
router.delete("/deleteCart/:ucid", shopController.deleteCart);
router.get("/getUserCarts", shopController.getUserCarts);
router.get("/getProducts", shopController.getProducts);

module.exports = router;