const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.get("/", authenticateToken, async (req, res) => {
  const email = req.query.email;
  const queryStr = `${email}@gmail.com`;
  try {
    if (queryStr === "adminuser@gmail.com") {
      const users = await Users.find();
      res.json(users);
    } else {
      const users = await Users.find({ email: queryStr });
      res.json(users);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email: email });
    if (user && user.password === password) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET);
      res.status(200).json({ message: "Login successful", token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/upload", authenticateToken, async (req, res) => {
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

router.delete("/delete", authenticateToken, async (req, res) => {
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

router.put("/update", authenticateToken, async (req, res) => {
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

router.put("/profile", authenticateToken, async (req, res) => {
  const { email, firstName, lastName } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
      res.status(201).json({ message: "Profile updated successfully" });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/stats", authenticateToken, async (req, res) => {
  try {
    const numberOfUsers = await Users.countDocuments();
    const result = await Users.aggregate([
      {
        $unwind: "$datasets",
      },
      {
        $group: {
          _id: "$_id",
          totalDatasets: { $sum: 1 },
          totalFeatures: { $sum: { $size: "$datasets.features" } },
        },
      },
      {
        $group: {
          _id: null,
          totalDatasets: { $sum: "$totalDatasets" },
          totalFeatures: { $sum: "$totalFeatures" },
        },
      },
      {
        $project: {
          _id: 0,
          totalDatasets: 1,
          totalFeatures: 1,
        },
      },
    ]).exec();
    res.status(200).json({ numberOfUsers, ...result[0] });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/stats/graph", authenticateToken, async (req, res) => {
  try {
    const result = await Users.aggregate([
      {
        $unwind: "$datasets",
      },
      {
        $unwind: "$datasets.features",
      },
      {
        $match: {
          "datasets.features.type": {
            $in: ["Text", "Date"],
          },
        },
      },
      {
        $group: {
          _id: {
            type: "$datasets.features.type",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.type",
          data: ["$count"],
        },
      },
    ]).exec();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.email = user;
    next();
  });
}

module.exports = router;
