const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  //Show all quizzes owned by current user
  router.get("/", (req, res) => {
    res.render("quizzes");
    }
  );
  //Creating new quiz
  router.post("/", (req, res) => {
    return db.query(`
      SELECT * FROM users
      WHERE username = 1$
      RETURNING *;
    `, [username])
      .then(res => {
        if (bcrypt.compareSync(password, res.rows.password)) {
          req.session.user_id = res.rows.id;
          res.redirect(`/`);
          return;
        }
        res.status(401).send('Email or password is incorrect');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //Quiz creation page
  router.get("/new", (req, res) => {
    res.render("quizzes_new");
  })
  //Taking quiz page using quiz id
  router.get("/:id", (req, res) => {
    res.render("quizzes_show")
  })
  //Getting results of quiz using quiz id and user id
  router.get("/:id/:userid", (req, res) => {
    res.render("quiz_results")
  })
  //Delete quiz
  router.delete("/:id", (req, res) => {
    return db.query(`
      UPDATE quizzes
      SET deleted_at = Now()
      WHERE id = 1$;
    `, [req.params.id])
      .then(res => res)
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })
  return router;
};
