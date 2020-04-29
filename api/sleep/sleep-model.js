const db = require("../../data/dbconfig");

module.exports = {
  findSleepByUserId,
  findSleepBySleepId,
  addSleep,
  updateSleep,
  deleteSleep,
};

function findSleepByUserId(user_id) {
  return db
    .select(
      "u.id as user_id",
      "s.id as sleep_record_id",
      "score",
      "start_time",
      "end_time",
      "notes",
      "created_at",
      "updated_at"
    )
    .from("sleep_details as s")
    .join("users as u", "u.id", "s.users_id")
    .where("u.id", user_id);
}

function findSleepBySleepId(sleep_id) {
  return db("sleep_details").where("sleep_details.id", sleep_id).first();
}

function addSleep(newSleep) {
  return db("sleep_details")
    .insert(newSleep, "id")
    .then(([id]) => {
      return findSleepBySleepId(id);
    });
}

function updateSleep(changes, sleep_id) {
  return db("sleep_details")
    .update(changes)
    .where("sleep_details.id", sleep_id)
    .then(() => {
      return findSleepBySleepId(sleep_id);
    });
}

function deleteSleep(sleep_id) {
  return db("sleep_details").where("sleep_details.id", sleep_id).del();
}
