const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const { db } = require("./firebase");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userRef = db.collection("users").doc(profile.id);
        const snap = await userRef.get();

        const userData = {
          uid: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          photo: profile.photos[0].value,
          provider: "google",
          updatedAt: Date.now(),
        };

        if (!snap.exists) {
          await userRef.set({
            ...userData,
            createdAt: Date.now(),
          });
        } else {
          await userRef.update(userData);
        }

        const token = jwt.sign(
          { uid: profile.id, email: userData.email },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        done(null, { token });
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
