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

articleService.getAllArticles = async () => {
  try {
    const acceptedArticles = await articleRepository.findAcceptedArticles();
    return acceptedArticles;
  } catch (error) {
    throw new AppError(error.message);
  }
};

articleService.likeArticle = async (id) => {
  try {
    const article = await articleRepository.likeArticle(id);
    return article;
  } catch (error) {
    throw new AppError(error.message);
  }
};

articleService.unLikeArticle = async () => {};

module.exports = articleService;
