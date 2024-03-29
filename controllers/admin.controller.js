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
    console.log(req.params)
    const approved = await adminService.ApproveArticle(req.params.id);
    res.status(200).json({
      message: "Article is approved successfully",
      data: approved,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

adminController.rejectArticle = async (req, res, next) => {
  try {
    const rejected = await adminService.rejectArticle(req.params.id);
    res.status(200).json({
      message: "Article is rejected successfully",
      data: rejected,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

adminController.answer = async (req, res, next) => {
  try {
    const answered = await adminService.answerQuestion(req.params.id, req.body.answer);
    res.status(200).json({
      message: "Question answered successfully",
      data: answered,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

module.exports = adminController;
