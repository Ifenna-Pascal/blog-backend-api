const { model, Schema, Types } = require("mongoose");

const questionSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },

    question: {
      type: String,
      required: [true, "question is required"],
    },

    answer: {
      type: String,
    },

    isAnswerd: {
      type: Boolean,
      default: false,
    },

    upvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = new model("question", questionSchema);
