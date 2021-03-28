DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;
  
USE employees_db;

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY(department_id)
);

CREATE TABLE role (
    role_id INT NOT NULL AUTO_INCREMENT,
    role VARCHAR(30),
    salary DECIMAL(9,2),
    department_id INT NOT NULL,
    PRIMARY KEY(role_id),
    FOREIGN KEY(department_id) REFERENCES department (department_id)
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(emp_id),
    FOREIGN KEY(role_id) REFERENCES role (role_id),
    FOREIGN KEY(manager_id) REFERENCES employee (emp_id)
);

INSERT INTO department(department_name) VALUE("HR"),("SALES"), ("BUSINESS DEV");

INSERT INTO role(role, salary, department_id) VALUE("HR Manager", 80000.00, 1), ("HR Specialist", 70000.00, 1), ("Sales Manager", 80000.00, 2),
("Sales Specialist", 70000.00, 2), ("BizDev Manager", 80000.00, 3), ("BizDev Specialist", 70000.00, 3); 
