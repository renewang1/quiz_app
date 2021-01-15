const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log("homepage.js - req.session: ", req.session);
    const templateVars = { username: 'test' };
    console.log('templateVars: ', tempklateVars);
    res.render("index", templateVars);
  });

  router.get("/data", (req, res) => {
    return db.query(`
      SELECT title, quizzes.id as id, description, users.username as username FROM quizzes
      INNER JOIN users ON creator_id = users.id
      WHERE is_private = false
      AND deleted_at IS NULL;
    `)
    .then(data => res.json(data.rows))
    // .then(rows => res.json(rows))
    .catch(error => {
      res.status(500).json(error);
    })
  })
  return router;
};
