DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
	department_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	PRIMARY KEY(id)
);

CREATE TABLE role (
	role_id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30),
	salary DECIMAL(8, 2),
	department_id INT,
	PRIMARY KEY(role_id),
	FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);
SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employees;