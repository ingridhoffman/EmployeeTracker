// Node dependencies
const Table = require("cli-table");

// Module export
const display = module.exports;

// display data in tables
display.table = async function (res, type) {
	let head = [];
	let colWidths = [];
	let data = [];
	console.log(typeof res);
	res.map((item) => {
		data.push(Object.values(item));
	});
	console.log(data);
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
	return console.log(displayTable.toString(), "\n");
};
