const Sleep = require("../api/sleep/sleep-model");

const sleepUserVerification = (req, res, next) => {
  const { user } = req.tokenPayload;
  const { users_id } = req.body;

  Sleep.findSleepByUserId(user).then(() => {
    if (user === users_id) {
      next();
    } else {
      res.send(`Permission Denied`);
    }
  });
};

module.exports = sleepUserVerification;
