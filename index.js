const mysql = require("mysql");
const inquirer = require("inquirer");
const consoletable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root1",
  database: "employees_db",
});

connection.connect((error) => {
  if (error) throw error;
  start();
});

// Display logo text, load main prompts
function start() {
  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          return viewEmployees();

        case "Add Employee":
          return addEmployee();

        case "Update Employee Role":
          return updateEmployeeRole();

        case "View All Roles":
          return viewRoles();

        case "Add Role":
          return addRole();

        case "View All Departments":
          return viewDepartments();

        case "Add Department":
          return viewDepartments();

        case "Quit":
          console.log("Quitting");
          connection.end();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
}

function viewEmployees() {
  connection.query(
    "SELECT * FROM employee ORDER BY last_name",
    (error, response) => {
      if (error) throw error;
      console.table(response);
      start();
    }
  );
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "roleId",
        message: "What is the employee's role id?",
      },
      {
        type: "input",
        name: "managerId",
        message: "Who is the employee's manager?",
      },
    ])

    .then((response) => {
      connection.query("INSERT INTO employee SET ?", {
        first_name: response.first_name,
        last_name: response.last_name,
        role_id: response.roleId,
        manager_id: response.managerId,
      });
      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      );
      start();
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the name of the role?",
      },

      {
        type: "input",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID?",
      },
    ])
    .then((response) => {
      connection.query("INSERT INTO role SET ?", {
        role: response.title,
        salary: response.salary,
        department_id: response.department_id,
      });
      console.log(`Added ${role.title} to the database`);
      start();
    });
}

function updateEmployeeRole() {
  connection.query(
    "SELECT emp_id, first_name, role, manager_id FROM employee LEFT JOIN role ON employee.role_id = role.role_id",
    (error, response) => {
      if (error) throw error;
      console.table(response);

      inquirer
        .prompt([
          {
            type: "input",
            name: "idUpdate",
            message: "Please enter the new employee id number to update ",
          },
          {
            type: "input",
            name: "newId",
            message: "Please enter the updated role id for this employee ",
          },
        ])
        .then((response) => {
          connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                role_id: response.newId,
              },
              {
                emp_id: response.idUpdate,
              },
            ],
            (error, response) => {
              if (error) throw error;
              console.log("The employee's role has been updated.");
              start();
            }
          );
        });
    }
  );
}

function viewRoles() {
  connection.query("SELECT * FROM role ORDER BY role", (error, response) => {
    if (error) throw error;
    console.table(response);
    start();
  });
}

function viewDepartments() {
  connection.query(
    "SELECT * FROM role ORDER BY department_id",
    (error, response) => {
      if (error) throw error;
      console.table(response);
      start();
    }
  );
}
