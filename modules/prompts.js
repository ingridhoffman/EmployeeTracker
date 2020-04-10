// Node dependencies
const inquirer = require("inquirer");

// Local dependencies
const db = require("./db");

// Application prompts
const mainMenu = [
	{
		type: "list",
		name: "main",
		message: "What would you like to do?",
		choices: ["VIEW", "ADD", "UPDATE", "REMOVE", "EXIT"],
	},
	{
		type: "list",
		name: "view",
		message: "What would you like to view?",
		choices: [
			{ name: "All Departments", value: "dept" },
			{ name: "All Roles", value: "role" },
			{ name: "All Employees", value: "employee" },
			new inquirer.Separator(),
			"Employees by Department",
			"Employees by Manager",
		],
		when: function (answers) {
			return answers.main === "VIEW";
		},
	},
	{
		type: "list",
		name: "add",
		message: "What would you like to add?",
		choices: [
			{ name: "Department", value: "dept" },
			{ name: "Role", value: "role" },
			{ name: "Employee", value: "employee" },
		],
		when: function (answers) {
			return answers.main === "ADD";
		},
	},
	{
		type: "list",
		name: "update",
		message: "What would you like to update?",
		choices: [
			{ name: "Department", value: "dept" },
			{ name: "Role", value: "role" },
			{ name: "Employee", value: "employee" },
		],
		when: function (answers) {
			return answers.main === "UPDATE";
		},
	},
	{
		type: "list",
		name: "remove",
		message: "What would you like to remove?",
		choices: [
			{ name: "Department", value: "dept" },
			{ name: "Role", value: "role" },
			{ name: "Employee", value: "employee" },
		],
		when: function (answers) {
			return answers.main === "REMOVE";
		},
	},
];

const add = {
	addDept: [
		{
			type: "input",
			name: "dept",
			message: "What department would you like to add?",
		},
	],
	addRole: [
		{
			type: "input",
			name: "title",
			message: "What is the job title for the role?",
		},
		{
			type: "input",
			name: "salary",
			message: "What is the salary for this role?",
		},
		{
			type: "list",
			name: "roleDept",
			message: "Which department is this role in?",
			choices: function (answers) {
				return [1, 2, 3];
				// error: not waiting for list of choices
				// let query = "SELECT * FROM departments";
				// return db.listData(query);
			},
		},
	],
	addEmp: [
		{
			type: "input",
			name: "firstName",
			message: "What is the employee's first name?",
		},
		{
			type: "input",
			name: "lastName",
			message: "What is the employee's last name?",
		},
		{
			type: "list",
			name: "empRole",
			message: "Which role is this employee in?",
			choices: function (answers) {
				return [1, 2, 3];
				// error: not waiting for list of choices
				// let query = "SELECT id, title FROM roles";
				// return db.listData(query);
			},
		},
		{
			type: "list",
			name: "empMgr",
			message: "Who is the manager for this employee?",
			choices: function (answers) {
				return [1, 2, 3];
				// error: not waiting for list of choices
				// let query = "SELECT id, CONCAT(first_name, ' ', last_name) FROM employees";
				// return db.listData(query);
			},
		},
	],
};

const update = {
	updateDept: [
		{
			type: "list",
			name: "dept",
			message: "Which department would you like to update?",
			choices: [],
		},
		{
			type: "input",
			name: "dept",
			message: "What is the new name for this department?",
		},
	],
	updateRole: [
		{
			type: "list",
			name: "role",
			message: "Which role would you like to update?",
			choices: [],
		},
		{
			type: "list",
			name: "roleProp",
			message: "What would you like to update for this role?",
			choices: ["Title", "Salary", "Department"],
		},
		{
			type: "input",
			name: "title",
			message: "What is the new title for this role?",
			when: function (answers) {
				return answers.roleProp === "Title";
			},
		},
		{
			type: "input",
			name: "salary",
			message: "What is the new salary for this role?",
			when: function (answers) {
				return answers.roleProp === "Salary";
			},
		},
		{
			type: "list",
			name: "roleDept",
			message: "Which department is this role moving to?",
			choices: [],
			when: function (answers) {
				return answers.roleProp === "Department";
			},
		},
	],
	updateEmployee: [
		{
			type: "list",
			name: "emp",
			message: "Which employee would you like to update?",
			choices: [],
		},
		{
			type: "list",
			name: "empProp",
			message: "What would you like to update for this employee?",
			choices: ["First Name", "Last Name", "Role"],
		},
		{
			type: "input",
			name: "firstName",
			message: "What is the new first name for this employee?",
			when: function (answers) {
				return answers.roleProp === "First Name";
			},
		},
		{
			type: "input",
			name: "lastName",
			message: "What is the new last name for this employee?",
			when: function (answers) {
				return answers.roleProp === "Last Name";
			},
		},
		{
			type: "list",
			name: "empRole",
			message: "What is this employee's new role?",
			choices: [],
			when: function (answers) {
				return answers.roleProp === "Role";
			},
		},
	],
};
const remove = {
	removeDept: [
		{
			type: "list",
			name: "dept",
			message: "Which department would you like to remove?",
			choices: [],
		},
	],
	removeRole: [
		{
			type: "list",
			name: "role",
			message: "Which role would you like to remove?",
			choices: [],
		},
	],
	removeEmployee: [
		{
			type: "list",
			name: "emp",
			message: "Which employee would you like to remove?",
			choices: [],
		},
	],
};

module.exports = {
	mainMenu: mainMenu,
	add: add,
	update: update,
	remove: remove,
};
