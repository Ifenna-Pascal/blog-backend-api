const Question = require("../models/question.model");

const questionRepo = {};

questionRepo.getAllQuestions = async () => {
  try {
    const questions = await Question.find();
    return questions;
  } catch (error) {
    throw new Error(error.message);
  }
};

questionRepo.createQuestion = async (question) => {
  try {
    const newQuestion = await new Question(question);
    const savedQuestion = await newQuestion.save();
    return newQuestion;
  } catch (error) {
    throw new Error(error.message);
  }
};

questionRepo.answeredQuestions = async () => {
  try {
    const unAnsweredQuestions = await Question.find({ isAnswerd: true });
    return unAnsweredQuestions;
  } catch (error) {
    throw new Error(error.message);
  }
};

questionRepo.unAnsweredQuestion = async () => {
  try {
    const unAnsweredQuestions = await Question.find({ isAnswerd: false });
    return unAnsweredQuestions;
  } catch (error) {
    throw new Error(error.message);
  }
};

questionRepo.QuestionById = async (id) => {
  try {
    const question = await Question.findById(id);
    return question;
  } catch (error) {
    throw new Error(error.message);
  }
};



questionRepo.upVoteAnswer = async (id) => {
  try {
    const voteAnswer = await Question.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          upvotes: 1,
        },
      },
      { new: true }
    );
    return voteAnswer;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = questionRepo;
