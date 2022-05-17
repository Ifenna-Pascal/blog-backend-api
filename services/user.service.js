const userRepository = require("../databases/repository/user.repo");
const passwordHashing = require("../utilities/passwordHashing");
const jsonUtility = require("../utilities/jwt_utitlity");

const userService = {};

userService.createUser = async (user) => {
  try {
    const userExists = await userRepository.findOneUser(user.email);
    if (userExists) {
      throw new Error("user already exists");
    }
    const newUser = await userRepository.createUser(user);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

userService.userLogin = async (data) => {
  try {
    const user = await userRepository.findOneUser(data.email);
    if (!user) {
      throw new Error("user not found");
    }
    const match = await passwordHashing.comparePassword(
      data.password,
      user.password
    );
    if (!match) {
      throw new Error("password do not match");
    }
    const token = await jsonUtility.signToken(user._id);
    const signedUser = {};
    signedUser.firstName = user.firstName;
    signedUser.lastName = user.lastName;
    signedUser.email = user.email;
    signedUser.role = user.role;
    signedUser.token = token;
    return signedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userService;
