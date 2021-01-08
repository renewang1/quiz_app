const express = require('express');
const app = express();
const router  = express.Router();
const { userExists } = require("../helpers")
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/login", (req, res) => {
    const user = users[req.session.user_id]
    //checking if user is logged in
    if (user) {
      res.redirect("/");
    } else {
      res.render("login")
    }
  });

  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //Checking if email or password field is empty
    if (username === '' || password === '') {
      res.status(401).send('Username or password is empty');
      return;
    }
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
  return router;
};
