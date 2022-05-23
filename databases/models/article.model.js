const { model, Schema } = require("mongoose");

const articleSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "user id is required"],
  },
  title: {
    type: String,
    required: [true, "Item name is required"],
  },
  content: {
    type: String,
    required: [true, "article content is required"],
  },

  status: {
    type: String,
    enum: ["accepted", "rejected"],
    default: "rejected"
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  noOfViews: {
    type: Number,
    default: 0,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downVotes: {
    type: Number,
    default: 0,
  },
  minutesRead: {
    type: String,
  },
});

module.exports = new model("article", articleSchema);
