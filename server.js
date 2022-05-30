// import requirements
const mongoConnect = require("./utilities/db_connection");
const app = require("./app");
const path = require("path");
const cloudinary = require("cloudinary");

// handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION... shutting down");
  process.exit(1);
});

// align config path
require("dotenv").config({ path: path.join(__dirname, `/config/${process.env.APP_ENV?.trim()}.env`), });

// connect to Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// connect to mongoose
mongoConnect(process.env.MONGO_URL);

// connect port
const PORT = process.env.PORT || 9000;

// listen to server
const server = app.listen(PORT, () => {
  console.log("App is listeninig on port...", PORT);
});

// unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 🎇 Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
