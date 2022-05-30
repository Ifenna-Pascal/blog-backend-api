const jwt = require("jsonwebtoken");

const jsonUtilities = {};

jsonUtilities.signToken = async (id) => {
  const token = await jwt.sign(
    {
      _id: id,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

module.exports = jsonUtilities;
