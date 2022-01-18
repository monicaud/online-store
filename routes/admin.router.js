let express = require("express");
let router = express.Router();
let adminController = require("../controller/admin.controller");

// router.post("/signin", userController.signin);
// router.post("/signup", userController.signup);
//empSendRequest empUpdateOrder  empUnlockUser  empEditProfile   empLogOut

router.post("/addEmp", adminController.addEmp);
router.delete("/deleteEmp", adminController.deleteEmp);
router.get("/getTickets", adminController.empGetTickets);
router.post("/empLogin", adminController.getCredentials);
router.delete("/deleteProduct", adminController.deleteProduct);
router.post("/addProduct", adminController.addProduct);
router.put("/updateProduct", adminController.updateProduct);
router.post("/getUser", adminController.getUserName);

module.exports = router;