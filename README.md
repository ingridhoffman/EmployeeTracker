# EmployeeTracker

A solution for managing a company's employees using node, express, inquirer, and MySQL.

## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

### Acceptance Criteria

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
THEN I am presented with a choice or what to remove, then a list of what is existing to select from, and what I select is removed from the database

WHEN I choose to update a department, role, or employee
THEN I am presented with a choice of what to update, then a list of what is existing to select from, and then I can modify what I select and it is changed in the database

### View the total utilized budget of a department -- ie the combined salaries of all employees in that department

WHEN I complete what I want to do in the application
THEN I can choose EXIT

## Installation

## Usage

### Known Issues

1. Code needs refactoring for efficiency and use of updated ES6+ syntax
2. Application crashes if an employee who is a manger of another employee is selected to be removed.

## Contributing

Project requirements and content in the Assets folder provided by:
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.
