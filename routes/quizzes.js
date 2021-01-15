const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { query, response } = require('express');
const { restart } = require('nodemon');

module.exports = (db) => {
  //Show all quizzes owned by current user
  router.get("/", (req, res) => {
    console.log("quizzes.js file - req.session" , req.session);
    const templateVars = {username: req.session.username}
    res.render("myquizzes", templateVars);
    }
  );
  //Passing data to frontend
  router.get("/data", (req, res) => {
    // const username = req.session.user_id
    const username = req.session.username;
    db.query(`
      SELECT * FROM quizzes
      INNER JOIN users ON creator_id = users.id
      WHERE username = $1;
    `, [username])
    .then(data => data.rows)
    .then(rows => res.json(rows))
    .catch(error => {
      res.status(500).json(error);
    })
  })
  //Creating new quiz
  router.post("/", (req, response) => {
    console.log("quizzes.js - req: ", req.body);
    const username = req.session.username;
    return db.query(`
      SELECT * FROM users WHERE username = $1
    `, [username])
    .then(user => {
      const user_id = user.rows[0].id
      let returnData = {};
      return db.query(`
        INSERT INTO quizzes (creator_id, title, description, URL, is_private)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `, [user_id, req.body.quizTitle, req.body.quizDescription, 'URL', req.body.private])
        .then(res => {
          returnData.table1 = res.rows;
          const quiz_id = returnData.table1[0].id
          let queryString = `
          INSERT INTO questions (quiz_id, question)
          VALUES
          `
          for (let question in req.body.questions) {
            queryString += `
            (${quiz_id}, ${req.body.questions[question].prompt}),
            `
          }
          queryString = queryString.slice(0, -14);
          queryString += `
          RETURNING *;
          `
          // console.log('insert into questions')
          // console.log('insert into questions', queryString)
          return db.query(queryString)
            .then(res => {
              returnData.table2 = res.rows;
              // console.log('insert into answers')
              let queryString = `
                INSERT INTO answers (question_id, answer, is_correct)
                VALUES
              `
              let question_id = null;
              for (let question in req.body.questions) {
                for (let insertquestion of returnData.table2) {
                  if (req.body.questions[question].prompt === insertquestion.question) {
                    question_id = insertquestion.id;
                    for (let item in req.body.questions[question].answers) {
                      queryString += `
                        (${question_id}, ${req.body.questions[question].answers[item].answer}, ${req.body.questions[question].answers[item].correct}),
                      `
                    }
                  }
                }
              }
              queryString = queryString.slice(0, -24);
              queryString += `
                RETURNING *;
              `
              // console.log('insert into answers', queryString)
              return db.query(queryString)
              .then(() => {
                response.redirect(`/quizzes`)
              })
            })
      })
    })
    // if (req.session && req.session.username) {
    //   const queryParams = [];
    //   const id = req.body.id
    //   const title = req.body.title
    //   const description = req.body.description
    //   const URL = req.body.URL
    //   const is_private = req.body.is_private
    //   // queryParams.push(req.session.user_id, req.body.title, req.body.description, req.body.URL, req.body.private)
    //   queryParams.push(id, title, description, URL, is_private)
    //   let returnData = {};
    //   return db.query(`
    //     INSERT INTO quizzes (creator_id, title, description, URL, is_private)
    //     VALUES ($1, $2, $3, $4, $5)
    //     RETURNING *;
    //   `, queryParams)
    //     .then(res => {
    //       returnData.table1 = res.rows;
    //       //Getting array of questions from req.body
    //       const questions = Object.keys(req.body).filter(item => item.slice(0, 8) === "question");
    //       //Retreiving quiz id from returnData in previous insert query
    //       let quiz_id = returnData.table1[0].id;
    //       //Adding actual value of each question into array to use as query parameter
    //       let questionValues = [];
    //       for (const question of questions) {
    //         questionValues.push(req.body[question]);
    //       }
    //       // queryParams.push(returnData.table1.res.rows.id, req.body.question)
    //       let queryString = `
    //       INSERT INTO questions (quiz_id, question)
    //       `;
    //       //For loop to add string literals to queryString
    //       for (let i = 0; i < questions.length; i++) {
    //         if (i === 0) {
    //           queryString += `
    //           VALUES ($1, $${i + 2}),
    //           `
    //         } else if (i !== questions.length - 1) {
    //           queryString += `
    //           ($1, $${i + 2}),
    //           `
    //         } else {
    //           queryString += `
    //           ($1, $${i + 2})
    //           `
    //         }
    //       };
    //       queryString += `
    //       RETURNING *;
    //       `;
    //       //Adding quiz id to beginning of questionValues array
    //       questionValues.unshift(quiz_id);
    //       return db.query(queryString, questionValues)
    //     })
    //     .then(res => {
    //       returnData.table2 = res;
    //       //Getting array of answers from req.body
    //       let answers = Object.keys(req.body).filter(item => item.slice(0, 6) === 'answer')
    //       let answerValues = {};
    //       /*We define the question id within the answer name so answer2-1 would be answer 1 of question 2
    //       We can categorize answers based on question and put them into an object*/
    //       for (const answer of answers) {
    //         if (answerValues[answer.slice(6, 7)]) {
    //           answerValues[answer.slice(6, 7)].push(req.body[answer]);
    //         }	else {
    //           answerValues[answer.slice(6, 7)] = [req.body[answer]];
    //         }
    //       }
    //       /*By our queryString logic, we put all of the question ids at the beginning of the queryParams
    //       and the answer values after that*/
    //       let queryParams = [];
    //       for (let question in answerValues) {
    //         queryParams.push(question);
    //       }
    //       for (let question in answerValues) {
    //         for (let answer of answerValues[question]) {
    //           queryParams.push(answer);
    //         }
    //       }
    //       //Here we build the queryString using an answer counter so each string literal is different
    //       let queryString = `
    //       INSERT INTO answers (question_id, answer)
    //       VALUES `
    //       let numQuestions = Object.keys(answerValues).length;
    //       let answerCount = numQuestions + 1;
    //       for (let i = 0; i < Object.keys(answerValues).length; i++) {
    //         for (let j = 0; j < answerValues[i + 1].length; j++) {
    //           queryString += `
    //           ($${i + 1}, $${answerCount}),
    //           `;
    //           answerCount++;
    //         }
    //       }
    //       //After adding all of the values, we need to remove the last comma from the queryString
    //       queryString = queryString.slice(0, -14);
    //       queryString += `
    //         RETURNING *;
    //       `;
    //       // console.log(queryString)
    //       // console.log(queryParams)
    //       return db.query(queryString, queryParams)
    //     })
    //     // .then(res => {
    //     //   let answers = Object.keys(req.body).filter(item => item.slice(0, 6) === 'answer')
    //     //   let queryString = `
    //     //     UPDATE answers
    //     //     SET is_correct = true
    //     //     WHERE question_id =
    //     //   `
    //     //   return db.query(queryString, queryParams)
    //     // })
    //     .then(() => {
    //       response.status(200).send('completed')
    //     })
    //     .catch(err => {
    //       res
    //         .status(500)
    //         .json({ error: err.message });
    //     });
    //   } else {
    //     response.render("login");
    //   }
  });
  router.post("/update", (req, res) => {
    console.log(req)
    return res
    // return db.query(`
    //   UPDATE answers
    //   SET is_correct = true
    //   WHERE question_id = x
    //   AND id = y
    // `)
  })

  //Quiz creation page
  router.get("/new", (req, res) => {
    const templateVars = {username: req.session.username}
    // if (req.session && req.session.username) {
    //   res.render("newquiz");
    // } else {
    //   res.render("login");
    // }
    res.render("newquiz", templateVars)
  })
  //Taking quiz page using quiz id
  router.get("/:id", (req, res) => {
    const quizid = req.params.id
    return db.query(`
    SELECT * FROM quizzes
      INNER JOIN questions ON quizzes.id = questions.quiz_id
      INNER JOIN answers ON questions.id = answers.question_id
      WHERE quizzes.id = $1
      ORDER BY questions.id;
    `, [quizid])
    .then((data1) => {
      response.status(200);
      let data = data1.rows
      console.log(data[1])
      const templateVars = { data, username: req.session.username}
      res.render("doingquiz", templateVars);
    })
  })

  //Getting results of quiz using quiz id and user id
  router.get("/:id/:userid", (req, res) => {
    const quiz_id = req.params.id
    const user_id = req.params.userid
    const templateVars = {username: req.session.username, quiz_id, user_id}
    // console.log('inside get')
    if (req.session && req.session.username) {
      // console.log('inside render')
      // res.send('hello')
      return db.query(`
        SELECT result, title FROM results
        INNER JOIN quizzes ON quizzes.id = results.quiz_id
        WHERE user_id = $1
        AND results.quiz_id = $2;
      `, [user_id, quiz_id])
      .then(data => {
        templateVars.result = data.rows[data.rows.length - 1].result
        templateVars.title = data.rows[data.rows.length - 1].title
        // templateVars.numQuestions = data.rows[data.rows.length - 1].numQuestions
        return db.query(`
          SELECT count(*) FROM questions
          INNER JOIN quizzes ON quizzes.id = quiz_id
          WHERE quiz_id = $1;
        `, [quiz_id])
      })
      .then((count) => {
        console.log(count.rows)
        templateVars.numQuestions = count.rows[0].count
        res.render("results", templateVars);
      })
    } else {
      res.render("login", templateVars);
    }
  })

  //Post results of quiz to database
  router.post("/:id/:userid", (req, res) => {
    const user_id = req.params.userid;
    const quiz_id = req.params.id;
    let returnData = {user_id, quiz_id}
    let answers = [];
    for (let item of req.body.forminfo) {
      answers.push(item.answer_id)
    }
    return db.query(`
      SELECT is_correct FROM answers
      WHERE id IN (${answers});
    `)
    .then(data => {
      let count = 0;
      for (let item of data.rows) {
        if (item.is_correct) {
          count++;
        }
      }
      returnData.count = count;
      return returnData
    })
    .then(result => {
      // console.log(result)
      db.query(`
        INSERT INTO results (user_id, quiz_id, result)
        VALUES ($1, $2, $3)
      `, [user_id, quiz_id, returnData.count])
      return db.query(`
      SELECT * FROM users WHERE id = $1
      `, [user_id])
    })
    .then((user) => {
      returnData.username = user.rows[0].username
      res.redirect(`/quizzes/${quiz_id}/${user_id}`)
    })
  })

  //Delete quiz
  router.delete("/:id", (req, res) => {
    const templateVars = {username: req.session.username}
    if (req.session && req.session.username) {
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
    } else {
      res.render("login", templateVars);
    }
  })
  return router;
};
