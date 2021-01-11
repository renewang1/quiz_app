const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //checking if user is logged in
    if (req.session && req.session.user_id) {
      res.redirect("/");
    } else {
      res.render("login")
    }
  });

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    //Checking if username or password field is empty
    if (username === '' || password === '') {
      res.status(401).send('Username or password is empty');
      return;
    }
    return db.query(`
      SELECT * FROM users
      WHERE username = $1;
    `, [username])
      .then(res => {
        console.log(res.rows[0].password)
        if (bcrypt.compareSync(password, res.rows[0].password)) {
          console.log(res.rows.id)
          // req.session.user_id = res.rows.id;
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
