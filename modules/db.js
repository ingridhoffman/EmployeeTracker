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

db.getData = function (query, type) {
	connection.query(query, function (err, res) {
		if (err) throw err;
		display.table(res, type);
	});
	return "working";
};

db.putData = function (query) {};
