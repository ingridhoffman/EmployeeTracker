// Node dependencies
const Table = require("cli-table");

// Module export
const display = module.exports;

display.table = function (res, type) {
	let head = [];
	let colWidths = [];
	let data = [];
	res.map((item) => {
		data.push(Object.values(item));
	});
	switch (type) {
		case "dept":
			head = ["ID", "Department Name"];
			colWidths = [5, 20];
			break;
		case "role":
			head = ["ID", "Title", "Salary", "Department"];
			colWidths = [5, 20, 10, 20];
			break;
		case "employee":
			head = ["ID", "First Name", "Last Name", "Role", "Department", "Salary", "Manager"];
			colWidths = [5, 15, 15, 20, 20, 10, 20];
			break;
	}
	const displayTable = new Table({
		head: head,
		colWidths: colWidths,
	});
	for (let i in data) {
		displayTable.push(data[i]);
	}
	// currently not working for employee table due to null values in data
	console.log(displayTable.toString(), "\n");
};
