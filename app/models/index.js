const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.manager = require("./manager.model.js")(sequelize, Sequelize);
db.employee = require("./employee.model.js")(sequelize, Sequelize);
db.manager.belongsToMany(db.user, {
  through: "user_manager",
  foreignKey: "userId",
  otherKey: "userId"
});
db.employee.belongsToMany(db.user, {
  through: "user_employee",
  foreignKey: "userId",
  otherKey: "userId"
});
db.user.belongsToMany(db.manager, {
  through: "user_manager",
  foreignKey: "userId",
  otherKey: "userId"
});
db.user.belongsToMany(db.employee, {
  through: "user_employee",
  foreignKey: "userId",
  otherKey: "userId"
});
db.USERS = ["employee", "manager"];
module.exports = db;
