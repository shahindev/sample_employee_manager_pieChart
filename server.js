const express = require("express");
const cors = require("cors");
const app = express();
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const { join } = require('path');
const morgan = require("morgan");
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */
const adapter = new FileSync(join(__dirname, '..', 'db.json'));
const db = require("./app/models");
const User = db.user;
const Employee = db.employee;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors());
var bcrypt = require("bcryptjs");
require('./app/routes/auth.routes')(app);
db.sequelize.sync(
  // {force: true} // if you start hide it
).then(() => {
  console.log("DB sync db.");
  initial();  // if you start hide it
});
function initial() {
  User.findAll()
    .then(data => {
      if(data.length == 0){
  User.create({
    id: 1,
    username: 'manager',
    name: "manager",
    email: 'manager@ok.com',
    password: bcrypt.hashSync('manager@12345'),
    mobile: '9876543210',
    role: 'manager',
  })

  User.create({
    id: 2,
    username: 'employee',
    name: "employee",
    email: 'employee@ok.com',
    password: bcrypt.hashSync('employee@12345'),
    mobile: '9876543210',
    role: 'employee',
  })
}
})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving employee."
  });
});
}


app.get("/", (req, res) => {
  Employee.findAll()
    .then(data => {
      console.log(data)
      var employes = [];
      myemploye = {};
      data.forEach(element1 => {
        myemploye = element1.name;
        employes.push(myemploye);
      });
      var employesSkil = [];
      myemployeSkil = {};
      data.forEach(element2 => {
        myemployeSkil = element2.employeeNumber
        employesSkil.push(myemployeSkil);
      });
      res.render(__dirname + "/app/views/index.html", {
        datas: JSON.stringify(employes),
        skill: JSON.stringify(employesSkil)
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employee."
      });
    });
});

const PORT = process.env.PORT || 4000; //localhost:4000/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
