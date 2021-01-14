const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
<<<<<<< HEAD
=======
const cookieSession = require('cookie-session');

// router.use(cookieSession({
//   name: "session",
//   keys: ['b6d0e7eb-8c4b-4ae4-8460-fd3a08733dcb', '1fb2d767-ffbf-41a6-98dd-86ac2da9392e']
// }));
>>>>>>> 979e1669174afb446f912dca5e079f1e13aa6575

module.exports = (db) => {
  router.get("/", (req, res) => {
    //checking if user is logged in
    if (req.session && req.session.username) {
      res.redirect("/");
    } else {
      const templateVars = { username: req.session.username };
      res.render("login", templateVars);
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
      .then(data => {
        console.log(data.rows[0].password)
        if (bcrypt.compareSync(password, data.rows[0].password)) {
          req.session.username = username;
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
