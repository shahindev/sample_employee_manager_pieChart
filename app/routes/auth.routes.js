const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const employee = require("../controllers/employee.controller");
const manager = require("../controllers/manager.controller");
const { authJwt } = require("../middleware");
module.exports = function (app) {
  const validateEmpty = (req, res, next) => {
    let value = req.body;
    if (!value) {
      return res.status(500).send({
        error: "empty value"
      });
    }
    // if string value is longer than 0, continue with next function in route
    next();
  }
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH');
    res.header('Access-Control-Allow-Credentials', 'false');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup", validateEmpty,
    [ verifySignUp.checkDuplicateUsernameOrEmail,],
    controller.signup
  );
  app.post("/api/auth/signin", validateEmpty, controller.signin);
// Employee role
  app.post("/api/employee/create", [authJwt.verifyToken], employee.create);
  app.get("/api/employee", [authJwt.verifyToken], employee.findAll);
  app.get("/api/employee/:id", [authJwt.verifyToken,], employee.findOne);
  app.put("/api/employee/update/:id", [authJwt.verifyToken], employee.update);
  app.delete("/api/employee/:id", [authJwt.verifyToken], employee.delete);
  // Manager role
  app.post("/api/manager/create", [authJwt.verifyToken,authJwt.isManager], manager.create);
  app.get("/api/manager", [authJwt.verifyToken,authJwt.isManager], manager.findAll);
  app.get("/api/manager/:id", [authJwt.verifyToken,authJwt.isManager], manager.findOne);
  app.put("/api/manager/update/:id", [authJwt.verifyToken,authJwt.isManager], manager.update);
  app.delete("/api/manager/:id", [authJwt.verifyToken,authJwt.isManager], manager.delete);

};