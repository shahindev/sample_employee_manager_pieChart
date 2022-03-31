module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
      username: {
        type: Sequelize.STRING
      },
      name:{
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      mobile:{
        type: Sequelize.STRING(12)
      },
      role:{
        type: Sequelize.STRING
      }
    });
  
    return User;
  };
  