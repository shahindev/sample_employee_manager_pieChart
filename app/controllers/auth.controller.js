const db = require("../models");
const config = require("../config/auth.config");
const dataResp = require("../middleware/dataResponce");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log("req", req)
  User.create({
    username: req.body.username,
    name: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    mobile: req.body.mobile,
    role: 'employee'
  })
    .then(user => {
      console.log("the users value is to be : " + user)
      res.send(dataResp.dataResponce(200, res.statusCode == 200, user, "User was registered successfully!"));
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      res.status(200).send({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};