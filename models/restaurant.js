const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
class Restaurant {
  constructor(name, address, type, website, description, author, date, id) {
    this.name = name;
    this.address = address;
    this.type = type;
    this.website = website;
    this.description = description;
    this.author = author;
    this.date = date;
    this.id = id;
  }

  async save() {
    const restaurant = {
      name: this.name,
      address: this.address,
      type: this.type,
      website: this.website,
      description: this.description,
      author: this.author,
      date: this.date,
    };
    return db.getDb().collection("restaurant").insertOne(restaurant);
  }

  async fetchRestaurants() {
    return db.getDb().collection("restaurant").find().toArray();
  }

  async fetchRestaurant() {
    const restaurantId = new ObjectId(this.id);
    return db.getDb().collection("restaurant").findOne({ _id: restaurantId });
  }
}

module.exports = Restaurant;
