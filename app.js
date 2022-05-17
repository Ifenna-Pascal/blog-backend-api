const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// import global error
const globalErrorHandler = require("./controllers/error.controller");
const AppError = require("./utilities/AppError");

// initialize express
const app = express();

// setup helmet
app.use(helmet());

// set morgan only for development runtime
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Limit request from same IP
const limiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in one hour",
});

app.use("/api", limiter);

// body parser, reads data from req.body
app.use(express.json({ limit: "40kb" })); // middleware function that can modify income data

// setup timing to request headers
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// initial ping
app.get("/api/ping", (req,res) => {
  res.json("we just came life");
});

// setup routes
app.use('/api/auth', require('./routes/auth.route'));

// No matching routes
app.all("*", (req, res, next) => {
  next(new AppError(`route ${req.originalUrl} does not matching`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
