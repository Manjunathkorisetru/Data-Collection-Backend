const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const Post = require("../models/post");
const { v4: uuidv4 } = require("uuid");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post("/upload", async (req, res) => {
//   const { myFile } = req.body;
//   try {
//     const newImage = await Post.create({ myFile });
//     newImage.save();
//     res.status(201).json({ message: "Image uploaded successfully" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.post("/upload", async (req, res) => {
  const { email, image, features } = req.body;
  const id = uuidv4();
  try {
    const user = await Users.findOne({ email });
    if (user) {
      user.datasets.push({ id, image, features });
      user.save();
      res.status(201).json({ message: "Image uploaded successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/delete", async (req, res) => {
  const { email, id } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      user.datasets = user.datasets.filter((dataset) => dataset.id !== id);
      user.save();
      res.status(201).json({ message: "Image deleted successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/update", async (req, res) => {
  const { email, id, features } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      user.datasets = user.datasets.map((dataset) => {
        if (dataset.id === id) {
          dataset.features = features;
        }
        return dataset;
      });
      user.save();
      res.status(201).json({ message: "Features updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
