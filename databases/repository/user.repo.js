const User = require("../models/user.model");

const userRepository = {};

userRepository.findOneUser = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userRepository.findOneUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

userRepository.createUser = async (user) => {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = userRepository;
