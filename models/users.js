const mongoose = require("mongoose");

// const featuresSchema = new mongoose.Schema({
//   image: {
//     type: String,
//     default: "",
//   },
//   name: {
//     type: String,
//     required: false,
//   },
//   value: {
//     type: String,
//     required: false,
//   },
//   type: {
//     type: String,
//     required: false,
//   },
// });

const userSchema = new mongoose.Schema(
  {
    email: String,
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
