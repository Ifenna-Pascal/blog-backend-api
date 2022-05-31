const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const adminValidatorSchema = require("../validatorshema/admin.schema");
const auth = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");

router.get(
  "/pending_approval",
  auth.isAuth,
  auth.isAdmin,
  adminController.allPendingApprovals
);

router.put(
  "/approve/:id",
  auth.isAuth,
  auth.isAdmin,
  validatorMiddleware(adminValidatorSchema.updateArticle, "params"),
  adminController.approveArticle
);

router.put(
  "/reject/:id",
  auth.isAuth,
  auth.isAdmin,
  validatorMiddleware(adminValidatorSchema.updateArticleArticle, "params"),
  adminController.rejectArticle
);


module.exports = router;
