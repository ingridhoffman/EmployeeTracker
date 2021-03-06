// Node dependencies
const Table = require("cli-table");

// Module export
const display = module.exports;

// display data in tables
display.table = async function (res, type) {
	let head = [];
	let colWidths = [];
	let data = [];
	res.map((item) => {
		delete item.id;
		data.push(Object.values(item));
	});
	console.log(type);
	type = type.substring(0, 3);
	console.log(type);
	switch (type) {
		case "dep":
			head = ["Department Name"];
			colWidths = [20];
			break;
		case "rol":
			head = ["Title", "Salary", "Department"];
			colWidths = [20, 10, 20];
			break;
		case "emp":
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
