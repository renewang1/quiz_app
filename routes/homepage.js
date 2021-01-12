const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // res.render("homepage");
    return db.query('SELECT * FROM quizzes;')
      .then(res => {
        return res.rows
      })
    }
  );
  return router;
};
