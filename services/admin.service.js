const articleRepository = require("../databases/repository/article");
const questionRepository = require("../databases/repository/question.repo");

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

adminService.answerQuestion = async (id, answer) => {
  try {
    let question = await questionRepository.QuestionById(id);
    if (question.isAnswered === true) {
      return "Question Has Already Been Anwered By Admin Previously";
    } else {
      question.answer = answer;
      question.isAnswered = true;
      const answeredQuestion = await question.save();
      return answeredQuestion;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = adminService;
