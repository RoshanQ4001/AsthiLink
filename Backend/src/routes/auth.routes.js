const express = require("express");
const { db } = require("../firebase");
const { generateToken } = require("../utils/jwt");

const router = express.Router();

/**
 * SIGNUP
 */
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const userRef = db.collection("users").doc(email);
  const snapshot = await userRef.get();

  if (snapshot.exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const userData = {
    username,
    email,
    password, // ⚠ plain text for now (hash later)
    createdAt: Date.now(),
  };

  await userRef.set(userData);

  const token = generateToken({
    email,
    username,
  });

  res.json({
    token,
    user: {
      email,
      username,
    },
  });
});

/**
 * LOGIN
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userRef = db.collection("users").doc(email);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    return res.status(404).json({ message: "User not found" });
  }

  const user = snapshot.data();

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    email: user.email,
    username: user.username,
  });

  res.json({
    token,
    user: {
      email: user.email,
      username: user.username,
    },
  });
});

module.exports = router;
