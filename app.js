const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const con = require('./users')
// The secret should be an unguessable long string (you can use a password generator for this!)
const JWT_SECRET =
  "10";

const app = express();
app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`${username} is trying to login ..`);
  console.log(`${password} is trying to login ..`);

  if (username === "admin" && password === "admin") {
    return res.json({
      token: jsonwebtoken.sign({ user: "admin" }, JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: "The username and password your provided are invalid" });
});
app.get("/super", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Bearer <token>>
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token is valid
    const { user } = jsonwebtoken.verify(token,JWT_SECRET);
    console.log(`user ${user}`);
    return res.status(200).json({
      message: `Congrats ${user}! You can now accesss the super secret resource`,
    });
  } catch (error) {
    console.log("error is "+error);
    return res.status(401).json({ error: "Not Authorized in catch" });
  }
});
con.connect ((error) =>{
  if(error)console.log("error found", error);
  else console.log("connection succesful");
});
app.listen(3001, () => {
  console.log("API running on localhost:3001");
});
