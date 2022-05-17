// import bycrypt
const bycrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const passwordUtility = {};

passwordUtility.hashPassword = async (password) => {
  try {
    const salt = await bycrypt.genSaltSync(SALT_ROUNDS);
    const hash = await bycrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

passwordUtility.comparePassword = async (inputpassword, userpassword) => {
  try {
    const passwordMatch = await bycrypt.compare(inputpassword, userpassword);
    return passwordMatch
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = passwordUtility;
