const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("quizzes")
    }
  );
  //Creating new quiz
  router.post("/", (req, res) => {

  });
  //Quiz creation page
  router.get("/new", (req, res) => {

  })
  //Taking quiz page using quiz id
  router.get("/:id", (req, res) => {

  })
  //Getting results of quiz using quiz id and user id
  router.get("/:id/:userid", (req, res) => {

  })
  //Delete quiz
  router.delete("/:id", (req, res) => {

  })
  return router;
};
