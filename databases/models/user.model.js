const { model, Schema } = require("mongoose");
const passwordUtility = require("../../utilities/passwordHashing");
const AppError = require("../../utilities/appError");
// declares user schema
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: [true, "firstName is required"],
      trim: true,
      lowercase: true,
    },

    lastName: {
      type: String,
      require: [true, "lastName is required"],
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      require: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
        message: "Please enter a valid e-mail address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

// hash password
userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = await passwordUtility.hashPassword(user.password);
      user.password = hash;
      next();
    } catch (error) {
      next(new AppError(error.message));
    }
  }
});

// exports user model
module.exports = model("user", userSchema);
