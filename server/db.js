const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./stock.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to SQLite");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS fund (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    balance INTEGER NOT NULL
  )
`);

module.exports = db;