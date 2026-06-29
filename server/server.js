const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/*
--------------------------------
ADD FUND
--------------------------------
*/
app.post("/fund", (req, res) => {
  const { user, balance } = req.body;

  console.log("Received:", req.body);

  if (!user || !balance) {
    return res.status(400).json({
      error: "user and balance are required",
    });
  }

  db.run(
    "INSERT INTO fund (user, balance) VALUES (?, ?)",
    [user, balance],
    function (err) {
      if (err) {
        console.error("SQLite Error:", err);

        return res.status(500).json({
          error: err.message,
        });
      }

      res.status(201).json({
        id: this.lastID,
        user,
        balance,
      });
    }
  );
});

/*
--------------------------------
GET ALL STOCKS
--------------------------------
*/
app.get("/fund", (req, res) => {
  db.all(
    "SELECT * FROM fund",
    [],
    (err, rows) => {
      if (err) {
        console.error("SQLite Error:", err);

        return res.status(500).json({
          error: err.message,
        });
      }

      res.json(rows);
    }
  );
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});