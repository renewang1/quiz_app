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
  module.exports = { userExists }
}
