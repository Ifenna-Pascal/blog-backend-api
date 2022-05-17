const AppError = require("../utilities/appError");
const middleware = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error", message);
      next(new AppError(message, 422));
    }
  };
};

module.exports = middleware;
