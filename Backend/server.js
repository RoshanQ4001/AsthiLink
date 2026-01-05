require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./config/passport");

const authRoutes = require("./routes/auth.routes");
const pagesRoutes = require("./routes/pages.routes");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/pages", pagesRoutes);

app.get("/", (_, res) => res.send("AesthiLink Backend Running 🚀"));

app.listen(process.env.PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT}`)
);
