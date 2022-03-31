module.exports = (sequelize, Sequelize) => {
    const Manager = sequelize.define("companyDetails", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      managerName: {
        type: Sequelize.STRING
      },
      managerDetails: {
        type: Sequelize.STRING
      },
      managerAdress:{
        type: Sequelize.STRING
      },
      skills:{
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.INTEGER,
      }
    });
  
    return Manager;
  };
  