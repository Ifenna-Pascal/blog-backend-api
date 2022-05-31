const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const userValidatorSchema = require("../validatorshema/user.schema");
const auth = require("../middlewares/auth.middleware");

const userController = require("../controllers/user.controller");

router.post(
  "/create_article",
  auth.isAuth,
  userController.createArticle
);



 

module.exports = router;