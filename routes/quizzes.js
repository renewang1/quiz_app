const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { query } = require('express');

module.exports = (db) => {
  //Show all quizzes owned by current user
  router.get("/", (req, res) => {
    res.render("quizzes");
    }
  );
  //Creating new quiz
  router.post("/", (req, res) => {
    const queryParams = [];
    const id = req.body.id
    const title = req.body.title
    const description = req.body.description
    const URL = req.body.URL
    const is_private = req.body.is_private
    // queryParams.push(req.session.user_id, req.body.title, req.body.description, req.body.URL, req.body.private)
    queryParams.push(id, title, description, URL, is_private)
    let returnData = {};
    return db.query(`
      INSERT INTO quizzes (creator_id, title, description, URL, is_private)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, queryParams)
      .then(res => {
        returnData.table1 = res.rows;
        const questions = Object.keys(req.body).filter(item => item.slice(0, 8) === "question");
        let quiz_id = returnData.table1[0].id;
        let questionValues = [];
        for (const question of questions) {
          questionValues.push(req.body[question]);
        }
        // queryParams.push(returnData.table1.res.rows.id, req.body.question)
        let queryString = `
        INSERT INTO questions (quiz_id, question)
        `;
        for (let i = 0; i < questions.length; i++) {
          if (i === 0) {
            queryString += `
            VALUES ($1, $${i + 2}),
            `
          } else if (i !== questions.length - 1) {
            queryString += `
            ($1, $${i + 2}),
            `
          } else {
            queryString += `
            ($1, $${i + 2})
            `
          }
        };
        queryString += `
        RETURNING *;
        `;
        questionValues.unshift(quiz_id);
        return db.query(queryString, questionValues)
      })
      .then(res => {
        returnData.table2 = res;
        // queryParams.push(returnData.table2.res.rows.id, req.body.answer, req.body.correct)

        let answers = Object.keys(req.body).filter(item => item.slice(0, 6) === 'answer')
        let answerValues = {};

        for (const answer of answers) {
          if (answerValues[answer.slice(6, 7)]) {
          answerValues[answer.slice(6, 7)].push(req.body[answer]);
          }	else {
          answerValues[answer.slice(6, 7)] = [req.body[answer]];
          }
        }

        console.log(answers)
        console.log(answerValues)





        let queryString = `
          INSERT INTO answers (question_id, answer, correct)
        `
        db.query(`
        INSERT INTO answers (question_id, answer, correct)
        VALUES ($1, $2, $3)
        `, [queryParams[queryParams.length - 1], queryParams[queryParams.length]])
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
