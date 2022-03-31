const db = require("../models");
const Manager = db.manager;
const Op = db.Sequelize.Op;

// Create and Save a new emp
exports.create = (req, res) => {
  console.log('hello ' + req.body);
  // Validate request
  if (!req.body.managerName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a manager
  const manager = {
    managerName: req.body.managerName,
    managerDetails: req.body.managerDetails,
    managerAdress: req.body.managerAdress,
    userId: req.body.userId,
    skills: req.body.skills
  };

  // Save manager in the database
  Manager.create(manager)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Manager."
      });
    });
};

// Retrieve all manager from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Manager.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving manager."
      });
    });
};

// Find a single manager with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Manager.findByPk(id)
    .then(data => {
      console.log(data, "data")
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving manager with id=" + id
      });
    });
};

// Update a manager by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Manager.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Manager was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update manager with id=${id}. Maybe manager was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating manager with id=" + id
      });
    });
};

// Delete a manager with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Manager.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Manager was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete manager with id=${id}. Maybe manager was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete manager with id=" + id
      });
    });
};

