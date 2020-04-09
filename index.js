// Node dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require("cli-table");

// Local dependencies
const prompts = require("./modules/prompts");

// Express app and port
const app = express();
const PORT = process.env.PORT || 8080;

// MySQL database and connection
// (be sure to insert your password)
const connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "UofOBootcamp",
	database: "employee_db",
});

connection.connect(function (err) {
	if (err) throw err;
	runApp();
});

// CLI-Tables
const deptTable = new Table({
	head: ["ID", "Department Name"],
	colWidths: [5, 20],
});
const roleTable = new Table({
	head: ["ID", "Title", "Salary", "Department"],
	colWidths: [5, 20, 10, 20],
});
const employeeTable = new Table({
	head: ["ID", "First Name", "Last Name", "Role", "Department", "Salary", "Manager"],
	colWidths: [5, 20, 20, 20, 20, 10, 20],
});

// table is an Array, so you can `push`, `unshift`, `splice` and friends

// Main application
function runApp() {
	inquirer.prompt(prompts.mainMenu).then((answer) => {
		switch (answer.main) {
			case "VIEW":
				viewData(answer);
				break;
		}
		console.log(answer);
	});
}

function viewData(answer) {
	switch (answer.view) {
		case "All Departments":
			// set view options and call view query function
			// let query = "SELECT * FROM departments";
			// let row = [res[i].id, res[i].dept];
			// let table = deptTable;
			// viewQuery(query, row, table);
			connection.query("SELECT * FROM departments", function (err, res) {
				if (err) throw err;
				for (let i = 0; i < res.length; i++) {
					let row = [res[i].id, res[i].dept];
					deptTable.push(row);
				}
				console.log(deptTable.toString());
				runApp();
			});
			break;
		case "All Roles":
			connection.query(
				"SELECT roles.id, roles.title, roles.salary, departments.dept FROM roles INNER JOIN departments ON roles.dept_id = departments.id",
				function (err, res) {
					if (err) throw err;
					console.log(res);
					for (let i = 0; i < res.length; i++) {
						let row = [res[i].id, res[i].title, res[i].salary, res[i].dept];
						roleTable.push(row);
					}
					console.log(roleTable.toString());
					runApp();
				}
			);
			break;
		case "All Employees":
			connection.query(
				"SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.dept, roles.salary FROM employees INNER JOIN roles ON employees.role_id = roles.id INNER JOIN departments ON roles.dept_id = departments.id",
				function (err, res) {
					if (err) throw err;
					console.log(res);
					for (let i = 0; i < res.length; i++) {
						let row = [res[i].id, res[i].first_name, res[i].last_name, res[i].title, res[i].dept, res[i].salary];
						employeeTable.push(row);
					}
					console.log(employeeTable.toString());
					runApp();
				}
			);
			break;
		case "Employees by Department":
			break;
		case "Employees by Manager":
			break;
	}
}

// query function for all VIEW options
// function viewQuery(query, row, table) {
// 	connection.query(query, function (err, res) {
// 		if (err) throw err;
// 		console.log(res);
// 		for (let i = 0; i < res.length; i++) {
// 			table.push(row);
// 		}
// 		console.log(table.toString());
// 		runApp();
// 	});
// }

// Server is listening
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT);
});
