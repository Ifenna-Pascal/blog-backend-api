const articleService = require("../services/article.service");
const questionService = require("../services/question.service");
const AppError = require("../utilities/appError");
const Formidable = require("formidable");
const cloudinaryUpload = require("../utilities/cloudinaryUpload");
const calculate_reading_time = require("../utilities/caluclate_reading_time");
const userController = {};

userController.createArticle = async (req, res, next) => {
  try {
    const form = new Formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      if (err) {
        next(new AppError(err.message));
      }
      if (!files.image || !fields.content || !fields.name) {
        next(
          new AppError(
            "Data not complete either content, image or name is missing"
          )
        );
      }
      const uploadedImage = await cloudinaryUpload.upload_image(
        files.image.filepath,
        "articles"
      );
      const data = {
        user: req.USER_ID,
        title: fields.name,
        content: fields.content,
        readingTime: await calculate_reading_time(fields.content),
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

userController.findAcceptedArticles = async (req, res, next) => {
  try {
    const articles = await articleService.getAllArticles();
    res.status(200).json({
      status: "All accepted articles",
      message: articles,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

userController.likeArticle = async (req, res, next) => {
  try {
    const article = await articleService.likeArticle(req.params.id);
    res.status(200).json({
      status: "Article Like successfully",
      message: article,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

userController.askQuestion = async (req, res, next) => {
  try {
    const data = {
      user: req.USER_ID,
      question: req.body.question,
    };
    const question = await questionService.askQuestion(data);
    res.status(200).json({
      status: "successfully asked successfully",
      message: question,
    });
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

userController.allQuestions = async (req, res, next) => {
  try {
    const questions = await questionService.allQuestions();
    res.status(200).json({
      status: 'questions retrieved successfully',
      message: questions
    })
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

userController.getAQuestion = async (req, res, next) => {
  try {
    const question = await questionService.oneQuestion(req.params.id)
    res.status(200).json({
      status: 'question retrieved successfully',
      message: question
    })
  } catch (error) {
    next(new AppError(error.message), 404);
  }
}

userController.answeredQuestions = async (req, res, next) => {
  try {
    const questions = await questionService.answeredQuestions();
    res.status(200).json({
      status: 'answered questions retrieved successfully',
      message: questions
    })
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};
userController.unAnsweredQuestions = async (req, res, next) => {
  try {
    const questions = await questionService.unAnsweredQuestions();
    res.status(200).json({
      status: 'unanswered questions retrieved successfully',
      message: questions
    })
  } catch (error) {
    next(new AppError(error.message), 403);
  }
};

userController.voteAnswer = async (req, res, next) => {
  try {
    const result = await questionService.voteAnswer(req.params.id);
    res.status(200).json({
      message: "Voted Successfully"
    })
  } catch (error) {
    next(new AppError(error.message), 403);
  }
}


module.exports = userController;
