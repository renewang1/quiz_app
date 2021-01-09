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
    const queryParams = [];
    let returnData = {};
    db.query(`
      INSERT INTO quizzes (creator_id, title, description, URL, private)
      VALUES (1$, 2$, 3$, 4$, 5%)
      RETURNING *;
    `, queryParams)
      .then(res => {
        returnData.table1 = res;
        db.query(`
          INSERT INTO questions (quiz_id, question)
          VALUES (1$, 2$)
          RETURNING *;
        `, [returnData.table1.res.rows.id, queryParams])
      })
      .then(res => {
        returnData.table2 = res;
        db.query(`
        INSERT INTO answers (question_id, answer, correct)
        VALUES ($1, $2, $3)
        `, [returnData.table2.res.rows.id, queryParams])
      })
      .then(res => {
        returnData.table3 = res;
        return res;
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
    res.render("quizzes_show");
  })
  //Getting results of quiz using quiz id and user id
  router.get("/:id/:userid", (req, res) => {
    res.render("quiz_results");
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