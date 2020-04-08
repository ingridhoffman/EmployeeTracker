// Node dependencies
const express = require("express");
const mysql = require("mysql");
const inquirer = require("inquirer");
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

// Main application
function runApp() {
	inquirer.prompt(prompts.mainMenu).then((answers) => {
		console.log(answers);
	});

	// temp function to test connection to database
	// var query = "SELECT * FROM departments";
	// connection.query(query, function (err, res) {
	// 	console.log(res);
	// });
}

// Server is listening
app.listen(PORT, function () {
	console.log("Server listening on: http://localhost:" + PORT);
});
