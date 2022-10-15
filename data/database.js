const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;
async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("EatMore");
}

// 127.0.0.1

function getDb() {
  if (!database) {
    throw { message: "Database connection not established " };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
