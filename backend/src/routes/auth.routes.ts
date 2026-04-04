import express from "express";
import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import jwt from "jsonwebtoken";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  res.json({ message: "User registered successfully", user });
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const accessToken = jwt.sign({ userId: user.id }, "access_token_secret", {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId: user.id }, "refresh_token_secret", {
    expiresIn: "7d",
  });
  res.json({ message: "Login successful", token: accessToken, refreshToken });
});

// Refresh token
router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, "refresh_secret");

    const accessToken = jwt.sign(
      { userId: (decoded as any).userId },
      "access_secret",
      { expiresIn: "15m" },
    );

    res.json({ accessToken });
  } catch {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// Logout a user
router.post("/logout", (req, res) => {
  res.json({ message: "Logout successful" });
});

export default router;
