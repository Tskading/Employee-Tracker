const db = require("./db");
const inquirer = require("inquirer");
const connection = require("./db/connection");
const mysql = require("mysql");
const { insertRole } = require("./db");




function askForAction() {

    inquirer
        .prompt({
            message: "Please select an action from the list below.",
            name: "action",
            type: "list",
            choices: [
                "VIEW_DEPARTMENT",
                "VIEW_ROLE",
                "VIEW_EMPLOYEES",
                "CREATE_ROLE",
                "CREATE_DEPARTMENT",
                "CREATE_NEW_EMPLOYEE",
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
                case "CREATE_ROLE":
                    createRole();
                    return;
                case "CREATE_DEPARTMENT":
                    createDepartment();
                    return;

                case "CREATE_NEW_EMPLOYEE":
                    createEmployee();
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
};

function createRole() {
    db.getDepartment()
    .then((departments) => {

        const departmentChoices = departments.map((department) => ({
            value: department.department_id,
            name: department.name
        }))

        inquirer.prompt([
            {
                message: "What department is this role for?",
                type: "list",
                name: "department_id",
                choices: departmentChoices
            },

            {
                message: "What is the salary for this position?",
                type: "number",
                name: "salary"
            },

            {
                message: "What title will this employee have?",
                type: "input",
                name: "title"
                
            }
        ]).then(res => {
            console.log(res);
            db.insertRole(res);
        })
    });
};

function createDepartment() {
    db.getDepartment()
    .then(
        inquirer.prompt([
            {
                message: "What department do you want to create?",
                type: "input",
                name: "name"
            }
        ]).then(res => {
            console.log(res);
            db.insertDepartment(res);
        })
    )       

};

function createEmployee() {
    db.getRoles()
    .then((role) => {

        const roleChoices = role.map((roles) => ({
            value: roles.role_id,
            name: roles.title
        }))
    
        inquirer.prompt([
            {
                message: "What is the employees first name?",
                type: "input",
                name: "first_name"
            },
            {
                message: "What is the employees last name?",
                type: "input",
                name: "last_name"
            },

            {
                message: "What role will this employee have?",
                type: "list",
                name: "role_id",
                choices: roleChoices
            }
          
        ]).then(res => {
            console.log(res);
            db.insertEmployee(res);
        })
    })
}

askForAction();


