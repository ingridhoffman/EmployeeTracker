// Node dependencies
const express = require("express");
const inquirer = require("inquirer");

// Local dependencies
const prompts = require("./modules/prompts");
const db = require("./modules/db");
const display = require("./modules/display");

// Express app and port
const app = express();
const PORT = process.env.PORT || 8080;

// Main application
async function runApp() {
	const answer = await inquirer.prompt(prompts.mainMenu);
	switch (answer.main) {
		case "VIEW":
			return viewData(answer.view);
		case "ADD":
			return addData(answer.add);
	}
}

// Get and view data from database
async function viewData(viewAnswer) {
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
				"SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept AS department, roles.salary, COALESCE(CONCAT(manager.first_name, ' ', manager.last_name), 'N/A') AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id";
			break;
		case "Employees by Department":
			return console.log("This function not yet available.");
			break;
		case "Employees by Manager":
			return console.log("This function not yet available.");
			break;
	}
	let res = await db.getData(query);
	await display.table(res, viewAnswer);
	await runApp();
}

// Add data to database
async function addData(addAnswer) {
	let answer;
	let query;
	let params;
	switch (addAnswer) {
		case "dept":
			answer = await inquirer.prompt(prompts.add.addDept);
			query = "INSERT INTO departments (dept) VALUES (?)";
			params = [answer.dept];
			break;
		case "role":
			answer = await inquirer.prompt(prompts.add.addRole);
			query = "INSERT INTO roles SET ?";
			params = { title: answer.title, salary: parseFloat(answer.salary), dept_id: answer.roleDept };
			break;
		case "employee":
			answer = await inquirer.prompt(prompts.add.addEmp);
			query = "INSERT INTO employees SET ?";
			params = {
				first_name: answer.firstName,
				last_name: answer.lastName,
				role_id: answer.empRole,
				manager_id: answer.empMgr,
			};
			break;
	}
	console.log("before put data");
	await db.putData(query, params);
	console.log("before get data");
	await viewData(addAnswer);
}

// Start app when server is listening
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT, "\n");
	runApp();
});
