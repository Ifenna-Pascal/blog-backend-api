const Article = require("../models/article.model");

const articleRepository = {};

articleRepository.findById = async (id) => {
  const article = await Article.findOne({ _id: id });
  return article;
};

articleRepository.findAll = async () => {
  const articles = await Article.findAll();
  return articles;
};

articleRepository.findUserArticle = async (id) => {
  const article = await Article.findOne({ user: id });
  return article;
};

articleRepository.createArticle = async (data) => {
  const newArticle = new Article(data);
  const savedArticle = await newArticle.save();
  return savedArticle;
};

articleRepository.findAcceptedId = async (id) => {
  const articles = await Article.find({ _id: id, status: "accepted" });
  return articles;
};

articleRepository.findUnAcceptedArticles = async () => {
  const unAcceptedArticles = await Article.find({ status: "rejected" });
  return unAcceptedArticles;
};

articleRepository.findPendingArticles = async () => {
  const pendingArticles = await Article.find({ status: "pending" }).populate("user");
  return pendingArticles;
};

articleRepository.acceptArticle = async (id) => {
  const updatedArticle = await Article.findOneAndUpdate(
    { _id: id },
    { status: "accepted" },
    { new: true }
  );
  console.log(updatedArticle);
  return updatedArticle;
};

module.exports = articleRepository;
