const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const { userExists } = require("../helpers")

// router.use(cookieSession({
//   name: "session",
//   keys: ['key1', 'key2']
// }));

module.exports = (db) => {
  router.get("/", (req, res) => {
    //checking if user is logged in
    if (req.session && req.session.user_id) {
      res.redirect("/");
    } else {
      res.render("register")
    }
  });

  router.post("/", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    //Checking if email or password field is empty
    if (username === '' || password === '') {
      res.status(401).send('Username or password is empty');
      return;
    }
    //Checking if username is already in use by existing user
    // if (userExists(username)) {
    //   res.status(409).send('Username is already in use');
    //   return;
    // }
    //Creating user in users database
    const hashedPassword = bcrypt.hashSync(password, 10);
    return db.query(`
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [username, email, hashedPassword])
      .then(res => res)
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
