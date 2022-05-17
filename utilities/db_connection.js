const mongoose = require("mongoose");

module.exports = (databaseUrl) => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose
    .connect(databaseUrl, connectionParams)
    .then(() => {
      console.log(`Successfully Connected  Database `);
    })
    .catch((err) => {
      console.error(`${err}`);
    });
};
