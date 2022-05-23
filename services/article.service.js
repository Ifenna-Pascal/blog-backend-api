const articleRepository = require("../databases/repository/article");
const AppError = require("../utilities/appError");

const articleService = {};

articleService.createArticle = async (data) => {
  try {
    const savedArticle = await articleRepository.createArticle(data);
    if (savedArticle) {
      return savedArticle;
    }
  } catch (error) {
    throw new AppError(error.message);
  }
};

module.exports = articleService;
