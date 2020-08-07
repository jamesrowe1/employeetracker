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
department VARCHAR(30),

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
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
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
FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL 
);

INSERT INTO departments (department)
VALUES ("Death Star"), ("Imperial Center"), ("Executor");

INSERT INTO roles (title, salary, department_id)
VALUES ("Emperor", "100000", 2), ("Lord of the Sith", "75000", 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Darth", "Vader", 2, 1), ("Sheev", "Palpatine", 1, null),

