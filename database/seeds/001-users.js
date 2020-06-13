const crypt = require("bcryptjs");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Jon Snow', password: crypt.hashSync("myqueen", 12)},
        {username: 'Samwell Tarley', password: crypt.hashSync("craven", 12)},
        {username: 'Dolorous Ed', password: crypt.hashSync("forthewatch", 12)}
      ]);
    });
};