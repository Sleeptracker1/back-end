exports.seed = function (knex) {
  return knex("sleep_details").insert([
    { users_id: 1, score: "4", start_time: "10:33", end_time: "05:37" },
    { users_id: 1, score: "3", start_time: "11:17", end_time: "06:37" },
    { users_id: 1, score: "2", start_time: "10:23", end_time: "06:12" },
    { users_id: 2, score: "4", start_time: "11:39", end_time: "07:12" },
    { users_id: 2, score: "4", start_time: "00:17", end_time: "08:37" },
  ]);
};
