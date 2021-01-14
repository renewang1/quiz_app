const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const templateVars = { username: 'test' };
    res.render("doingquiz", templateVars);
  });

  router.get("/data", (req, res) => {
    db.query(`
      SELECT * FROM quizzes
      INNER JOIN questions ON quizzes.id = questions.quiz_id
      INNER JOIN answers ON questions.id = answers.question_id
      ORDER BY questions.id;
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
