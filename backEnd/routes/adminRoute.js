const express = require("express")
const router = express.Router();
const adminController = require("../controllers/adminController")
const passport = require("passport")
const { isAdmin } = require("../middleware")

router.route("/users")
    .get(isAdmin, adminController.allUser)

router.route("/users/:_id")
    .get(isAdmin, adminController.userDetails)
    .put(isAdmin, adminController.updateUserRole)
    .patch(isAdmin,adminController.blockAndUnblockUser)
    .delete(isAdmin, adminController.deleteUserByAdmin)


router.route("/orders")
    .get(isAdmin, adminController.allOrders)
    
module.exports = router