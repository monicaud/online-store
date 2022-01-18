let express = require("express");
let router = express.Router();
let employeeController = require("../controller/employee.controller");

// router.post("/signin", userController.signin);
// router.post("/signup", userController.signup);
//empSendRequest empUpdateOrder  empUnlockUser  empEditProfile   empLogOut

router.put("/empUpdateOrder", employeeController.empUpdateOrder);
router.post("/empSendRequest", employeeController.empSendRequest);
router.delete("/empUnlockUser/:username", employeeController.empUnlockUser);
router.get("/empGetTickets", employeeController.empGetTickets);
router.put("/empEditProfile", employeeController.empEditProfile);
router.post("/empLogin", employeeController.getCredentials);
router.post("/empGetUser", employeeController.getUserName)
router.put("/empUpdateOrder", employeeController.empUpdateOrder);
router.get("/empGetOrders", employeeController.getOrders);
module.exports = router;