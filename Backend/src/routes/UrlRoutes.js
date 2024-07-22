const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

const {
  createShortUrl,
  getUrls,
  deleteShortUrl,
  getUrl,
  updateUrl,
  incrementClicks,
} = require("../controllers/UrlController");

router.route("/url").post(isAuthenticated, createShortUrl);
router.route("/urls").get(isAuthenticated, getUrls);
router.route("/url/:id").delete(isAuthenticated, deleteShortUrl);
router.route("/url").put(isAuthenticated, updateUrl);
router.route("/url").get(getUrl);
router.route("/url/:id/click").put(incrementClicks);

module.exports = router;
