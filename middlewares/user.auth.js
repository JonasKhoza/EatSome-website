function isAuth(req, res, next) {
  const uid = req.session.uid;
  const isAuth = req.session.isAuthenticated;

  if (!uid || !isAuth) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = isAuth;

  next();
}

module.exports = { isAuth: isAuth };
