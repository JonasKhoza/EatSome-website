const mongodbStore = require("connect-mongodb-session");

function createSession(store) {
  return {
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

function mongoStore(session) {
  const MongoDBStore = mongodbStore(session);
  const sessionStore = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "EatMore",
    collection: "sessions",
  });

  return sessionStore;
}

module.exports = {
  store: mongoStore,
  sessionStore: createSession,
};
