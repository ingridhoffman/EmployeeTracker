// Node dependencies
const express = require("express");
const inquirer = require("inquirer");

// Local dependencies
const prompts = require("./modules/prompts");
const db = require("./modules/db");

// Express app and port
const app = express();
const PORT = process.env.PORT || 8080;

// Main application
function runApp() {
	inquirer.prompt(prompts.mainMenu).then((answer) => {
		switch (answer.main) {
			case "VIEW":
				viewData(answer.view);
				break;
			case "ADD":
				addData(answer.add);
				break;
		}
	});
}

function viewData(viewAnswer) {
	let query;
	switch (viewAnswer) {
		case "dept":
			query = "SELECT * FROM departments";
			break;
		case "role":
			query =
				"SELECT roles.id, roles.title, roles.salary, departments.dept FROM roles LEFT JOIN departments ON roles.dept_id = departments.id";
			break;
		case "employee":
			query =
				"SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id";
			break;
		case "Employees by Department":
			return console.log("This function not yet available.");
			break;
		case "Employees by Manager":
			return console.log("This function not yet available.");
			break;
	}
	db.getData(query, viewAnswer);
	// wait for previous
	// .then(() => {
	// 	runApp();
	// });
}

function addData(addAnswer) {
	let query;
	let params;
	switch (addAnswer) {
		case "dept":
			inquirer.prompt(prompts.add.addDept).then((answer) => {
				query = "INSERT INTO departments (dept) VALUES (?)";
				params = [answer.dept];
			});
			break;
		case "role":
			inquirer.prompt(prompts.add.addRole).then((answer) => {
				console.log(answer);
				query = "INSERT INTO roles SET ?";
				params = { title: answer.title, salary: parseFloat(answer.salary), dept_id: answer.roleDept };
			});
			break;
		case "employee":
			inquirer.prompt(prompts.add.addEmp).then((answer) => {
				query = "INSERT INTO employees SET ?";
				params = {
					first_name: answer.firstName,
					last_name: answer.lastName,
					role_id: answer.empRole,
					manager_id: answer.empMgr,
				};
				console.log(params);
				db.putData(query, params);
				viewData(addAnswer);
			});
			break;
	}
	// wait for inquirer prompts to finish
	// db.putData(query, params);
	// wait for data to be added
	// then viewData(addAnswer) then runApp()
}
// Start app when server is listening
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT, "\n");
	runApp();
});
