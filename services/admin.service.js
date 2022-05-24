const articleRepository = require('../databases/repository/article');

const adminService = {};

adminService.findAllPendingArticles = async () => {
    try {
       const allPending = await articleRepository.findPendingArticles();
       return allPending; 
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = adminService;