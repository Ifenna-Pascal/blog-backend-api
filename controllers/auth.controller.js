const userService = require("../services/user.service");
const AppError = require("../utilities/appError");
const authController = {};

authController.createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    console.log(user);
    res.status(200).json({
      status: "successfully signed in",
      message: user,
    });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

authController.userLogin = async (req, res, next) => {
  try {
    const user = await userService.userLogin(req.body);
    res.status(200).json({
      status: "successfully signed in",
      message: user,
    });
  } catch (error) {
    next(new AppError(error.message), 404);
  }
};



module.exports = authController;
