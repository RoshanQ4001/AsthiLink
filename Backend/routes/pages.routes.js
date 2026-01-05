const express = require("express");
const { db } = require("../config/firebase");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const pages = [];
  const snap = await db
    .collection("pages")
    .where("owner", "==", req.user.uid)
    .get();

  snap.forEach(doc => pages.push({ id: doc.id, ...doc.data() }));
  res.json(pages);
});

router.delete("/:id", auth, async (req, res) => {
  await db.collection("pages").doc(req.params.id).delete();
  res.json({ success: true });
});

module.exports = router;
