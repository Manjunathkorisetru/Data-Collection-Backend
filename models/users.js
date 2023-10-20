const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    role: {
      type: Number,
      default: 0,
    },
    datasets: [
      {
        id: String,
        image: String,
        features: [
          {
            value: { type: String, default: "" },
            type: { type: String, default: "" },
          },
        ],
      },
    ],
  },
  {
    collection: "imageFeatures",
  }
);

module.exports = mongoose.model("imageFeatures", userSchema);
