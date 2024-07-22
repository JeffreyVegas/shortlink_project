const express = require("express");

const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/loaduser").get(isAuthenticated, getUser);
router.route("/logout").get(isAuthenticated, logout);

module.exports = router;
