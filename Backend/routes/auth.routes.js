const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(
      `${process.env.FRONTEND_URL}/dashboard.html?token=${token}`
    );
  }
);

module.exports = router;
