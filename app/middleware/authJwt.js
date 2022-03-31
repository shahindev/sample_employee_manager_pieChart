const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isEmployee = (req, res, next) => {
  User.findByPk(2).then(user => {
        if (user.role === "employee") {
          next();
          return;
        }else{
      res.status(200).send({
        message: "Require Employee Role!"
      });
      return;
    }
    });
};

isManager = (req, res, next) => {
  User.findByPk(1).then(user => {
    if (user.role === "manager") {
      next();
      return;
    }else{
  res.status(200).send({
    message: "Require Manager Role!"
  });
  return;
}
});
};

isManagerOrEmployee = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role) {
      next();
      return;
    }else{
  res.status(200).send({
    message: "Require Employee or Manager Role!"
  });
  return;
}
});
};

const authJwt = {
  verifyToken: verifyToken,
  isEmployee: isEmployee,
  isManager: isManager,
  isManagerOrEmployee: isManagerOrEmployee
};
module.exports = authJwt;