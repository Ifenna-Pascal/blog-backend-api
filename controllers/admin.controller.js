const adminService = require("../services/admin.service");
const AppError = require("../utilities/appError");

const adminController = {};

adminController.allPendingApprovals = async (req, res, next) => {
  try {
    const pending = await adminService.findAllPendingArticles();
    if (pending.length === 0) {
      return res.status(200).json({
        message: "Empty article approval request",
      });
    }
    res.status(200).json({
      message: pending,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

adminController.approveArticle = async (req, res, next) => {
  try {
    const approved = await adminService.ApproveArticle(req.params.id);
    res.status(200).json({
      message: "Article is approved successfully",
      data: approved
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

module.exports = adminController;
