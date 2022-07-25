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

router.get("/all_questions", userController.allQuestions);

router.get("/question/:id", validatorMiddleware(userValidatorSchema.likeArticle, "params") ,userController.getAQuestion)

router.get("/answered_questions", userController.answeredQuestions);

router.get("/unanswered_questions", userController.unAnsweredQuestions);

module.exports = router;
