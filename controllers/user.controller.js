const articleService = require("../services/article.service");
const AppError = require("../utilities/appError");
const Formidable = require("formidable");
const cloudinaryUpload = require("../utilities/cloudinaryUpload");
const userController = {};

userController.createArticle = async (req, res, next) => {
  try {
    const form = new Formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        next(new AppError(err.message));
      }
      if (!files.image) {
        next(new AppError("Image not found"));
      }
      const uploadedImage = await cloudinaryUpload.upload_image(
        files.image.filepath,
        "articles"
      );
      const data = {
        user: req.USER_ID,
        title: fields.name,
        content: fields.content,
        imageUrl: uploadedImage.url,
      };
      const article = await articleService.createArticle(data);
      res.status(200).json({
        status: "article has been sent to admin to approve",
        message: article,
      });
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

module.exports = userController;
