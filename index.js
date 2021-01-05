const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const mysql = require("mysql");




function askForAction() {

    inquirer
        .prompt({
            message: "Which department do you wish to view?",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENT",
                "VIEW_ROLE",
                "VIEW_EMPLOYEES",
                "QUIT"
            ]
        })
        .then((res) => {

            switch(res.action) {
                case "VIEW_DEPARTMENT":
                    viewDepartment();
                    return;

                case "VIEW_ROLE":
                    viewRoles();
                    return;
                
                case "VIEW_EMPLOYEES":
                    viewEmployees();
                    return;

                default:
                    connection.end();
            }
        })
}

function viewDepartment() {
    db.getDepartment()
        .then((results) => {
            console.table(results);
        });
};

function viewRoles() {
    db.getRoles()
        .then((results) => {
            console.table(results);
        });
};

function viewEmployees() {
    db.getEmployees()
        .then((results) => {
            console.table(results);
        });
}

askForAction();


