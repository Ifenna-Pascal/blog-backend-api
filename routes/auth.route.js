const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const authValidatorSchema = require("../validatorshema/auth.shema");
const authController = require("../controllers/auth.controller");

router.post(
  "/signup",
  validatorMiddleware(authValidatorSchema.signUp),
  authController.createUser
);

router.post(
  "/signin",
  validatorMiddleware(authValidatorSchema.login),
  authController.userLogin
);
 

module.exports = router;
