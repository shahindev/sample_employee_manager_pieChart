const db = require("../models");
const Employee = db.employee;
const Op = db.Sequelize.Op;

// Create and Save a new emp
exports.create = (req, res) => {
  console.log('hello ' + req.body);
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a emp
  const employees = {
    name: req.body.name,
    employeeNumber: req.body.employeeNumber,
    designation: req.body.designation,
    userId: req.body.userId,
    skills: req.body.skills
  };

  // Save emp in the database
  Employee.create(employees)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee."
      });
    });
};

// Retrieve all emp from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Employee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee."
      });
    });
};

// Find a single employee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Employee.findByPk(id)
    .then(data => {
      console.log(data, "data")
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving employee with id=" + id
      });
    });
};

// Update a employee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update employee with id=${id}. Maybe employee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating employee with id=" + id
      });
    });
};

// Delete a employee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id
      });
    });
};

