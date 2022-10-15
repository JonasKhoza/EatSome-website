const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user.controllers");

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/signup", userControllers.getUser);
router.post("/signup", userControllers.saveUser);

router.get("/login", userControllers.loginUser);
router.post("/login", userControllers.setLogin);

router.post("/logout", userControllers.setLogout);

module.exports = router;
