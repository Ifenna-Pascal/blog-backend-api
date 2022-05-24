const router = require("express").Router();
const validatorMiddleware = require("../middlewares/validator");
const adminValidatorSchema = require("../validatorshema/admin.schema");
const auth = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");
 

router.get("/pending_approval", auth.isAuth, auth.isAdmin, adminController.allPendingApprovals);
router.put("/approve/:id", auth.isAuth, auth.isAdmin, validatorMiddleware(adminValidatorSchema.approveArticle, "params"), adminController.approveArticle)

module.exports = router;