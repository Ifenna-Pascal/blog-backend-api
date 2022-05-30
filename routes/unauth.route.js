const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const userValidatorSchema = require("../validatorshema/user.schema");
const userController = require("../controllers/user.controller");

router.get("/all_articles", userController.findAcceptedArticles);

router.put(
  "/like/:id",
  validatorMiddleware(userValidatorSchema.likeArticle, "params"),
  userController.likeArticle
);

module.exports = router;
