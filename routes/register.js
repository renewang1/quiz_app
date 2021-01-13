const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  const userExists = function(username) {
    return db.query(`
    SELECT * FROM users
    WHERE username = $1;
    `, [username])
    .then(res => {
      if (res.rows.length > 0) {
        return true;
      } else {
        return false;
      }
    })
  }
  router.get("/", (req, res) => {
    //checking if user is logged in
    console.log('register.js file - req.session', req.session);
    if (req.session && req.session.username) {
      res.redirect("/");
    } else {
      const templateVars = { username: req.session.username };
      res.render("register", templateVars);
    }
  });

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const reenterpassword = req.body.reenterpassword;
    //console.log('==== req.body', req.body);
    //Checking if email or password field is empty
    if (username === '' || password === '') {
      res.status(401).send('Username or password is empty');
      return 'empty';
    }
    if (password !== reenterpassword) {
      res.status(401).send('Passwords do not match');
      return;
    }
    //Checking if username is already in use by existing user
    userExists(username).then(exists => {
      if (exists) {
        console.log('exists')
        res.status(409).send('Username is already in use');
      } else {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return db.query(`
          INSERT INTO users (username, password)
          VALUES ($1, $2)
          RETURNING *;
        `, [username, hashedPassword])
          .then(response => {
            // res.status(200).send("succcesfully registered")
            // create cookie
            req.session.username = username;
            res.redirect("../quizzes")
            return;
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      }
    })
    //Creating user in users database
  });
  return router;
};
