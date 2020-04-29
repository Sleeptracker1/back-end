const authValidation = (req, res, next) => {
  if (!req.body.username) {
    res.send("You must provide a username to proceed!");
  } else if (!req.body.password) {
    res.send("You must enter a password to proceed!");
  } else {
    next();
  }
};

module.exports = authValidation;
