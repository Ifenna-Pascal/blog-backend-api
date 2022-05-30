const Article = require("../models/article.model");

const articleRepository = {};

articleRepository.findById = async (id) => {
  const article = await Article.findOne({ _id: id });
  return article;
};

articleRepository.findAcceptedArticles = async () => {
  try {
    const articles = await Article.find({ status: "accepted" });
    return articles;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.findUserArticle = async (id) => {
  const article = await Article.find({ user: id });
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
  const pendingArticles = await Article.find({ status: "pending" }).populate(
    "user"
  );
  return pendingArticles;
};

articleRepository.acceptArticle = async (id) => {
  const updatedArticle = await Article.findOneAndUpdate(
    { _id: id, status: "pending" },
    { status: "accepted" },
    { new: true }
  );
  console.log(updatedArticle);
  return updatedArticle;
};

articleRepository.rejectArticle = async (id) => {
  const updatedArticle = await Article.findOneAndUpdate(
    { _id: id, status: "pending" },
    { status: "rejected" },
    { new: true }
  );
  console.log(updatedArticle);
  return updatedArticle;
};

articleRepository.likeArticle = async (id) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          upvotes: 1
        }
      },
      { new: true }
    );
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = articleRepository;
