let express = require("express");
let router = express.Router(); //create reference
let userController = require("../controller/user.controller"); //import user controller
let employeeController = require("../controller/employee.controller"); //import employee controller

router.post("/editProfile.html", userController.loadUserInfo);
router.put("/editProfile", userController.updateUserInfo);
router.get("/orderStatus.html", employeeController.getOrder);
router.put("/addUserFunds", userController.addUserFunds);
router.put("/updateUserFunds", userController.updateFunds);
router.post("/addUser", userController.addUser);
router.post("/userLogin", userController.getCredentials);
router.post("/getUser", userController.getUserName);

module.exports = router;