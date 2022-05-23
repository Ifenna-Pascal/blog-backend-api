const Article = require("../models/article.model");

const aritlceRepository = {};

aritlceRepository.findById = async (id) => {
  const article = await Article.findOne({ _id: id });
  return article;
};

aritlceRepository.findAll = async () => {
  const articles = await Article.findAll();
  return articles;
};

aritlceRepository.findUserArticle = async (id) => {
  const article = await Article.findOne({ user: id });
  return article;
};

aritlceRepository.findAcceptedId = async (id) => {
  const articles = await Article.find({ _id: id, status: "accepted" });
  return articles;
};

articleRepository.findUnAcceptedArticles = async () => {
    const unAcceptedArticles = await Article.find({status: "rejected" });
    return unAcceptedArticles;
}

articleRepository.reje

module.exports = articleRepository;
