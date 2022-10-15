const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const db = require("./data/database");
const sessionMiddleware = require("./middlewares/user.auth");
const defaultRoutes = require("./routes/default.routes");
const restaurantsRoutes = require("./routes/restaurant.routes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const sessionStorage = require("./session/session");

const createSession = sessionStorage.store(session);

app.use(session(sessionStorage.sessionStore(createSession)));
app.use(sessionMiddleware.isAuth);
app.use(express.urlencoded({ extended: false }));
app.use(defaultRoutes);
app.use(restaurantsRoutes);
app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

db.connectToDatabase()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Connection established on port 3000`);
    });
  })
  .catch(() => {
    console.log("Database connection not established");
  });
