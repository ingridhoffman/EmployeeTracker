// Node dependencies
const Table = require("cli-table");

// Module export
const display = module.exports;

// display data in tables
display.table = async function (res, type) {
	let head = [];
	let colWidths = [];
	let data = [];
	type = type.substring(0, type.indexOf("_"));
	res.map((item) => {
		delete item.id;
		data.push(Object.values(item));
	});
	switch (type) {
		case "dept":
			head = ["Department Name"];
			colWidths = [20];
			break;
		case "role":
			head = ["Title", "Salary", "Department"];
			colWidths = [20, 10, 20];
			break;
		case "employee":
			head = ["First Name", "Last Name", "Role", "Department", "Salary", "Manager"];
			colWidths = [15, 15, 20, 20, 10, 20];
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
