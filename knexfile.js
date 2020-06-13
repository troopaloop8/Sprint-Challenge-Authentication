require("dotenv").config();

const path = require('path');

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./database/auth.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: path.resolve("database", "migrations")
    },
    seeds: {
      directory:path.resolve("database", "seeds")
    },
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: "./database/test.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: path.resolve("database", "migrations")
    },
    seeds: {
      directory:path.resolve("database", "seeds")
    },
  }
};