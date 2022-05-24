const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const userValidatorSchema = require("../validatorshema/user.schema");
const auth = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");
 

router.get("/pending_approval", auth.isAuth, auth.isAdmin, adminController.allPendingApprovals)

module.exports = router;