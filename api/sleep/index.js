const express = require("express");

const Sleep = require("../sleep/sleep-model");

const sleepPostValidation = require("../../validationMiddleware/sleepPostValidation");
const sleepUserVerification = require("../../validationMiddleware/sleepUserVerification");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.tokenPayload);
  const { user } = req.tokenPayload;
  Sleep.findSleepByUserId(user)
    .then((sleep) => {
      res.status(200).json(sleep);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: `There was an error while retrieving sleep history from the database.`,
      });
    });
});

router.post("/", sleepUserVerification, sleepPostValidation, (req, res) => {
  const newSleepRecord = req.body;

  Sleep.addSleep(newSleepRecord)
    .then((sleep) => {
      res.status(201).json(sleep);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: `There was an error while creating a new sleep record in the database.`,
      });
    });
});

router.put("/:id", sleepUserVerification, (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  Sleep.findSleepBySleepId(id)
    .then((sleep) => {
      if (sleep) {
        Sleep.updateSleep(changes, id).then((updatedSleep) => {
          res.status(200).json(updatedSleep);
        });
      } else {
        res.status(404).json({
          errorMessage: `There are no sleep records associated with ID ${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: `There was an error while attempting to update this sleep record.`,
      });
    });

  router.patch("/:id", sleepUserVerification, (req, res) => {
    console.log(req.body);
    const changes = req.body;
    const { id } = req.params;

    Sleep.findSleepBySleepId(id)
      .then((sleep) => {
        if (sleep) {
          Sleep.updateSleep(changes, id).then((updatedSleep) => {
            res.status(200).json(updatedSleep);
          });
        } else {
          res.status(404).json({
            errorMessage: `There are no sleep records associated with ID ${id}.`,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          errorMessage: `There was an error while attempting to update this sleep record.`,
        });
      });
  });

  router.delete("/:id", (req, res) => {
    console.log(req.params);
    const { id } = req.params;

    Sleep.deleteSleep(id)
      .then(() => {
        res.status(200).json({
          message: `The sleep record with an ID of ${id} has successfully been deleted from the database.`,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          errorMessage: `There was an error while removing the sleep record with ID ${id} from the database.`,
        });
      });
  });
});

module.exports = router;
