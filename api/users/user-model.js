const db = require("../../data/dbconfig");

module.exports = {
  getByID,
  addUser,
  findBy,
  getUsers,
};

function getByID(id) {
  return db("users").where({ id }).first();
}

function addUser(user) {
  return db("users")
    .insert(user, 'id')
    .then(([id]) => {
      return getByID(id);
    });
}

function findBy(filter, val) {
  return db("users").where(filter, val).first();
}

function getUsers() {
  return db("users");
}
