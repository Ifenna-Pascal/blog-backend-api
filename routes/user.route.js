const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const userValidatorSchema = require("../validatorshema/user.schema");
const auth = require("../middlewares/auth.middleware");

const userController = require("../controllers/user.controller");

router.post("/create_article", auth.isAuth, userController.createArticle);

router.post(
  "/ask_question",
  validatorMiddleware(userValidatorSchema.askQuestion),
  auth.isAuth,
  userController.askQuestion
);

router.get("/all_questions", userController.allQuestions);

router.get("/answered_questions", userController.answeredQuestions);

router.get("/unanswered_questions", userController.unAnsweredQuestions);

module.exports = router;
