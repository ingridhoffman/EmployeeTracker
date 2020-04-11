# EmployeeTracker

A solution for managing a company's employees using node, express, inquirer, and MySQL.

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

### Acceptance Criteria

```
GIVEN that I am a business owner
WHEN I need to manage my employee information
THEN I need a database to store this information including:

- department id and name
- job (role) id, title, salary, and department (by id)
- employee id, first name, last name, job (by id), and manager (by id)

WHEN I open the application
THEN I am presented with prompts to VIEW, ADD, UPDATE, REMOVE, or EXIT

WHEN I choose to VIEW
THEN I can view departments, roles, employees or employees by department or manager

WHEN I choose to ADD
THEN I can choose to add a new department, role, or employee
THEN I am presented with prompts to enter the information
THEN the information is is added to the database

WHEN I choose to remove a department, role, or employee
THEN I am presented with a choice of what to remove
THEN a list of what is existing to select from
THEN what I select is removed from the database

WHEN I choose to update a department, role, or employee
THEN I am presented with a choice of what to update
THEN a list of what is existing to select from
THEN I can make a change and it is updated in the database

WHEN I complete what I want to do in the application
THEN I can choose EXIT
```

## Installation

Install the application package

```
install_github("ingridhoffman/EmployeeTracker")
```

Install dependencies

Create your database in MySQL

Go into db.js to enter your password for the database connection

## Usage

```
node index.js
```

### Known Issues

- Code needs refactoring for efficiency and use of updated ES6+ syntax

## Contributing

Project requirements and content in the Assets folder provided by:

© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
