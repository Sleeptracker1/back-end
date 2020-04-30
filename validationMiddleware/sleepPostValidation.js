const sleepPostValidation = (req, res, next) => {
  if (!req.body.users_id) {
    res.send(
      `You must provide a users_id to add a sleep record for this user!`
    );
  } else if (!req.body.start_time) {
    res.send(
      `You must provide a start time to enter this sleep record into the database!`
    );
  } else if (!req.body.end_time) {
    res.send(
      `You must provide an end time to enter this sleep record into the database!`
    );
  } else if (!req.body.score) {
    res.send(
      `You must provdie a sleep score to enter this sleep record into the database!`
    );
  } else {
    next();
  }
};

module.exports = sleepPostValidation;
