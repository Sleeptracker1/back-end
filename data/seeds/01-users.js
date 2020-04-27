exports.seed = function (knex) {
  return knex("users").insert([
    { username: "matthewTest", password: "Password1" },
    { username: "charlieTest", password: "Password2" },
  ]);
};
