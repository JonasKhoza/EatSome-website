const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/post.controllers");

router.get("/restaurants", restaurantController.getRestaurants);
router.get("/restaurants/:id", restaurantController.getRestaurant);

router.post("/recommend", restaurantController.addRestaurant);

router.get("/recommend", restaurantController.getRecommend);

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
