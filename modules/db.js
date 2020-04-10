// Node dependencies
const mysql = require("mysql");

// Local dependencies
const display = require("./display");

// Module export
const db = module.exports;

// Database and connection
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
	console.log("connected");
});

// main application functions
db.getData = function (query, type) {
	connection.query(query, function (err, res) {
		if (err) throw err;
		display.table(res, type);
	});
};
db.putData = function (query, params, type) {
	connection.query(query, params, function (err, res) {
		if (err) throw err;
		console.log("Update complete.");
	});
};

// inquirer prompts lists
db.listData = function (query) {
	connection.query(query, function (err, res) {
		if (err) throw err;
		let listArray = res.map((item) => {
			let values = Object.values(item);
			console.log(values);
			let container = { name: values[1], value: values[0] };
			console.log(container);
			return container;
		});
		console.log(listArray);
		return listArray;
	});
};
