const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    myFile: String,
  },
  {
    collection: "posts",
  }
);

module.exports = mongoose.model("posts", postSchema);
