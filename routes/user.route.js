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

router.put("/vote_answer/:id",  validatorMiddleware(userValidatorSchema.likeArticle, "params"), auth.isAuth, userController.voteAnswer);


module.exports = router;
