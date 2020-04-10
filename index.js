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
		}
	});
}

function viewData(viewAnswer) {
	let query;
	let type;
	switch (viewAnswer) {
		case "All Departments":
			// set query parameters
			query = "SELECT * FROM departments";
			type = "dept";
			break;
		case "All Roles":
			query =
				"SELECT roles.id, roles.title, roles.salary, departments.dept FROM roles LEFT JOIN departments ON roles.dept_id = departments.id";
			type = "role";
			break;
		case "All Employees":
			query =
				"SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id";
			type = "employee";
			break;
		case "Employees by Department":
			console.log("This function not yet available.");
			break;
		case "Employees by Manager":
			console.log("This function not yet available.");
			break;
	}
	db.getData(query, type);
	// returning to main function not yet working...
	// .then(() => {
	// 	console.log("working");
	// 	runApp();
	// });
}

// Start app when server is listening
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT, "\n");
	runApp();
});
