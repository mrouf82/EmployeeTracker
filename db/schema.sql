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
    
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY(emp_id),
   
);
