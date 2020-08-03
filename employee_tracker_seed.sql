-- removes if already there --
DROP DATABASE IF EXISTS employee_tracker_db;

-- create database
CREATE DATABASE employee_tracker_db;

-- actually use the db --
USE employee_tracker_db;

-- create the department table --
CREATE TABLE departments (
-- id is the primary key --
id INTEGER AUTO_INCREMENT NOT NULL,

-- table columns --
name VARCHAR(30),

-- set the primary key --
PRIMARY KEY (id)
);

-- create the roles table --
CREATE TABLE roles (
-- id is primary key --
id INTEGER AUTO_INCREMENT NOT NULL,

-- table columns --
title VARCHAR(30),
salary DECIMAL,
department_id INTEGER,

-- set the primary key --
PRIMARY KEY (id),
-- set the foreign keys --
FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- create the people table --
CREATE TABLE employees (
-- id is primary key --
id INTEGER AUTO_INCREMENT NOT NULL, 

-- table columns --
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,

-- set the primary key --
PRIMARY KEY (id),
-- set the foreign keys --
FOREIGN KEY (role_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES roles(id)
);

INSERT INTO departments (name)
VALUES ("Rowe Inc");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", "100000", 1), ("Wage-slave", "50000", 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Rowe", 1, null), ("John", "Rowe", 2, 1), ("Cate", "Rowe", 2, 1);

