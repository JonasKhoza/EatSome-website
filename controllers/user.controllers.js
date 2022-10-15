const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

function getUser(req, res) {
  let sessionData = req.session.inputData;
  if (!sessionData) {
    sessionData = {
      hasError: false,
      message: "",
      email: "",
      password: "",
      confirmEmail: "",
    };
  }
  req.session.inputData = null;

  req.session.save(() => {
    res.render("signup", { inputData: sessionData });
  });
  return;
}

async function saveUser(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const confirmEmail = req.body["confirm-email"];
  if (
    email.trim() !== confirmEmail.trim() ||
    !email.includes("@") ||
    !confirmEmail.includes("@") ||
    password.length < 6
  ) {
    req.session.inputData = {
      hasError: true,
      message:
        "Invalid input, please check your data! Emails must be the same, password must not be less than 6 characters long!",
      email: req.body.email,
      password: req.body.password,
      confirmEmail: req.body["confirm-email"],
    };

    req.session.save(() => {
      res.redirect("/signup");
    });
    return;
  }

  //Checking for existing user
  try {
    const checkUser = new User(email);
    const existingUser = await checkUser.findUser();
    if (existingUser) {
      req.session.inputData = {
        hasError: true,
        message: "User already exists!",
        email: req.body.email,
        password: req.body.password,
        confirmEmail: req.body["confirm-email"],
      };

      req.session.save(() => {
        res.redirect("/signup");
      });
      return;
    }

    const saveUserModel = new User(email, password);
    await saveUserModel.saveUser();
  } catch (error) {
    next(error);
  }

  req.session.inputData = {
    hasError: true,
    message: "Invalid input, please check your data!",
    email: req.body.email,
    password: req.body.password,
    confirmEmail: req.body["confirm-email"],
  };

  req.session.save(() => {
    res.redirect("/login");
  });
  return;
}

function getLogin(req, res) {
  let sessionData = req.session.inputData;
  if (!sessionData) {
    sessionData = {
      hasError: false,
      email: "",
      password: "",
    };
  }

  req.session.inputData = null;
  req.session.save(() => {
    res.render("login", { inputData: sessionData });
  });
  return;
}

async function setLogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  let existingUser;
  let passwordsAreEqual;

  try {
    const checkUser = new User(email);
    existingUser = await checkUser.findUser();
    passwordsAreEqual = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: "User does not exist!",
      email: req.body.email,
      password: req.body.password,
    };

    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: "Invalid password!",
      email: req.body.email,
      password: req.body.password,
    };
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }

  req.session.inputData = {
    hasError: true,
    message: "Invalid input, please check your data!",
    email: req.body.email,
    password: req.body.password,
  };

  req.session.uid = existingUser._id;
  req.session.isAuthenticated = true;

  req.session.save(() => {
    res.redirect("/recommend");
  });
}

function setLogout(req, res) {
  req.session.uid = null;
  req.session.isAuthenticated = false;
  req.session.save(() => {
    return res.redirect("/");
  });
}
module.exports = {
  getUser: getUser,
  saveUser: saveUser,
  loginUser: getLogin,
  setLogin: setLogin,
  setLogout: setLogout,
};
