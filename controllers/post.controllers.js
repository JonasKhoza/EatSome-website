const Restaurant = require("../models/restaurant");

async function addRestaurant(req, res, next) {
  const name = req.body.name;
  const address = req.body.address;
  const type = req.body.type;
  const website = req.body.website;
  const description = req.body.description;
  const author = req.body.author;
  const date = new Date();
  const restaurant = new Restaurant(
    name,
    address,
    type,
    website,
    description,
    author,
    date
  );
  try {
    await restaurant.save();
  } catch (error) {
    next(error);
  }

  res.redirect("/confirm");
}

async function getRestaurants(req, res, next) {
  let restaurants;
  let nextOrder;
  try {
    const restaurant = new Restaurant(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );

    let order = req.query.order;

    nextOrder = "desc";

    if (order !== "asc" && order !== "desc") {
      order = "asc";
    }

    if (order === "desc") {
      nextOrder = "asc";
    }

    restaurants = await restaurant.fetchRestaurants();

    restaurants.sort((resA, resB) => {
      if (
        (order === "asc" && resA.name > resB.name) ||
        (order === "desc" && resB.name > resA.name)
      ) {
        return 1;
      }
      return -1;
    });
  } catch (error) {
    return next(error);
  }

  res.render("restaurants", { restaurants: restaurants, nextOrder: nextOrder });
}

async function getRestaurant(req, res, next) {
  const getRestaurant = new Restaurant(
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    req.params.id
  );
  let restaurant;
  try {
    restaurant = await getRestaurant.fetchRestaurant();

    restaurant.humanReadableDate = restaurant.date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    restaurant.date = restaurant.date.toISOString();
  } catch (error) {
    return next(error);
  }
  res.render("restaurant-details", { restaurant });
}

function getRecommend(req, res) {
  if (!req.session.uid) {
    return res.status(401).render("401");
  }
  res.render("recommend");
}

module.exports = {
  addRestaurant: addRestaurant,
  getRestaurants: getRestaurants,
  getRestaurant: getRestaurant,
  getRecommend: getRecommend,
};
