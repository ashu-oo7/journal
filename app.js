const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = "dsff10312413#@$!@#$@#$!#@$erwdfa";

const app = express();
app.use(express.json());

require('./routes/user')(app);

app.use(function(req, res, next){
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "User Not Authorized" });
  }
  // This is a Bearer token
  var token = req.headers.authorization.split(" ")[1];
  try {
    const { user } = jsonwebtoken.verify(token,JWT_SECRET);
    console.log("the user object " + user);
    req.user = user
    next()
  } catch (error) {
    console.log("error while getting user details "+error);
    return res.status(401).json({ error: "Not Authorized user" });
  }
});

require('./routes/journal')(app);

app.listen(3001, () => {
  console.log("API running on localhost:3001");
});
