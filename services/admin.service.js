const articleRepository = require("../databases/repository/article");

const adminService = {};

adminService.findAllPendingArticles = async () => {
  try {
    const allPending = await articleRepository.findPendingArticles();
    return allPending;
  } catch (error) {
    throw new Error(error.message);
  }
};

adminService.ApproveArticle = async (id) => {
  try {
    const findArticle = await articleRepository.findById(id);
    if (findArticle && findArticle.status === "accepted") {
      return "Article approved already";
    }
    const approved = await articleRepository.acceptArticle(id);
    return approved;
  } catch (error) {
    throw new Error(error.message);
  }
};

adminService.rejectArticle = async (id) => {
  try {
    const findArticle = await articleRepository.findById(id);
    if (findArticle && findArticle.status === "rejected") {
      return "Article rejected already";
    }
    const rejected = await articleRepository.rejectArticle(id);
    return rejected;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = adminService;
