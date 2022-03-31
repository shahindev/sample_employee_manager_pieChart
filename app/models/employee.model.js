module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      employeeNumber: {
        type: Sequelize.STRING
      },
      designation:{
        type: Sequelize.STRING
      },
      skills:{
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER,
      }
    });
  
    return Employee;
  };
  