const Article = require("../models/article.model");

const articleRepository = {};

articleRepository.findById = async (id) => {
  try {
    const article = await Article.findOne({ _id: id });
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
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
  try {
    const article = await Article.find({ user: id });
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.createArticle = async (data) => {
  try {
    const newArticle = new Article(data);
    const savedArticle = await newArticle.save();
    return savedArticle;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.findAcceptedId = async (id) => {
  try {
    const articles = await Article.find({ _id: id, status: "accepted" });
    return articles;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.findUnAcceptedArticles = async () => {
  try {
    const unAcceptedArticles = await Article.find({ status: "rejected" });
    return unAcceptedArticles;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.findPendingArticles = async () => {
  try {
    const pendingArticles = await Article.find({ status: "pending" }).populate(
      "user"
    );
    return pendingArticles;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.acceptArticle = async (id) => {
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id, status: "pending" },
      { status: "accepted" },
      { new: true }
    );
    console.log(updatedArticle);
    return updatedArticle;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.rejectArticle = async (id) => {
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: id, status: "pending" },
      { status: "rejected" },
      { new: true }
    );
    console.log(updatedArticle);
    return updatedArticle;
  } catch (error) {
    throw new Error(error.message);
  }
};

articleRepository.likeArticle = async (id) => {
  try {
    const article = await Article.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          upvotes: 1,
        },
      },
      { new: true }
    );
    return article;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = articleRepository;
