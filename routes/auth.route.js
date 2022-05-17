const router = require("express").Router();
router;
const validatorMiddleware = require("../middlewares/validator");
const authValidatorSchema = require("../validatorshema/auth.shema");
const userController = require("../controllers/user.controller");

router.post(
  "/signup",
  validatorMiddleware(authValidatorSchema.signUp),
  userController.createUser
);

router.post(
  "/signin",
  validatorMiddleware(authValidatorSchema.login),
  userController.userLogin
);
 

module.exports = router;
