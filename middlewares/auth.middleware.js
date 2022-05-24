const user_repository_instance = require("../databases/repository/user.repo");
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");

// user authorization
const isAuth = async (req, res, next) => {
  try {
      console.log(req.headers)

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) throw new AppError("token not found", 404);
    const decoded = jwt.decode(token);
    console.log(decoded._id)
    const user = await user_repository_instance.findOneUserById(
      decoded._id
    );
    console.log(user);
    if (!user) throw new AppError("must be logged in", 403);
    req.USER_ID = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

// admin authorization
const isAdmin = async (req, res, next) => {
  try {
    const user = await user_repository_instance.findOneUserById(req.USER_ID);
    const role = user.role;
    if (role === "admin") next();
    else {
      throw new AppError("admins route only", 403);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  isAdmin,
  isAuth,
};


