import express from "express";
const app = express();

import jwt from "jsonwebtoken";

app.post("/api/signup", (req, res) => {
  const user = {
    id: 1,
    username: "john",
    email: "john@gmail.com",
  };

  jwt.sign({ user: user }, "secretkey", (err, token) => {
       console.log("signup completed.......");

    res.status(201).json({ token });
  });
});


app.post("/api/login", verifytoken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "login successful..",
        authData,
      });
    }
  });
});

function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    console.log(bearerToken);
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(3000);
