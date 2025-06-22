module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("Middleware Not logged in");
    return res.redirect("/login");
  }
  next();
};
