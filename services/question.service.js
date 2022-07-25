const questionRepository  = require('../databases/repository/question.repo');
const AppError = require("../utilities/appError");

const questionService = {};

questionService.askQuestion = (data) => {
    try {
        const newQuestion = questionRepository.createQuestion(data);
        return newQuestion;
    } catch (error) {
        throw new AppError(error.message);
    }
}

questionService.allQuestions = () => {
    try {
        const questions = questionRepository.getAllQuestions();
        return questions;
    } catch (error) {
        throw new AppError(error.message);
    }
}

questionService.oneQuestion = (id) => {
    try {
        const question = questionRepository.QuestionById(id);
        return question;
    } catch (error) {
        throw new AppError(error.message);
    }
}

questionService.answeredQuestions = () => {
    try {
        const answered = questionRepository.answeredQuestions();
        return answered;
    } catch (error) {
        throw new AppError(error.message);
    }
}

questionService.unAnsweredQuestions = () => {
    try {
        const unAnswered = questionRepository.unAnsweredQuestions();
        return unAnswered;
    } catch (error) {
        throw new AppError(error.message);
    }
}

questionService.voteAnswer = async (id, user) => {
    try {
        const question = await questionRepository.QuestionById(id);
        console.log(question);
        if(!question.isAnswered){
            throw new AppError("Question isn't answered yet")
        }
        const result = questionRepository.upVoteAnswer(id);
        return result;
    } catch (error) {
        throw new AppError(error.message);
    } 
}



module.exports = questionService;