var jsonwebtoken = require('jsonwebtoken');
var db = require('./db');

module.exports = function(app){

app.post("/user/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  db.connect(function(err) {
    if (err) throw err;
    var obj = {
      name : username
    }
    db.query('SELECT * FROM user', function (err, result) {
      if (err){
        console.log("error in getting details for username " + username);
        return next(err);
      }
      console.log(result);
      if(result.length == 0){
        console.log("No such user with username " + username);
        return res.status(200).json({ message: "No username " + username + "found" });
      }
      if (username === result[0].name && password === result[0].password) {
        return res.json({
          token: jsonwebtoken.sign({ user: username }, JWT_SECRET),
        });
      }
      return res.status(401).json({ message: "Invalid username or password" });
    });
  });

});

}