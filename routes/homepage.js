const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("index")
  });

  router.get("/data", (req, res) => {
    db.query(`
      SELECT * FROM quizzes
      INNER JOIN users ON creator_id = users.id
      WHERE is_private = false;
    `)
    .then(data => data.rows)
    .then(rows => res.json(rows))
    .catch(error => {
      res.status(500).json(error);
    })
    }
  )
  return router;
};
