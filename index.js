const inquirer = require("inquirer");
const { startingPoint, addDepartment, addRole, addEmployee, updateRole, updateManager, selectManager, selectDepartment } = require('./prompts');
const {CompanyDB ,SelectTable}= require('./helpers');
const { Pool } = require('pg');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'letsgo',
        host: 'localhost',
        database: 'company_db',
		port: 5432
    },
    console.log('Connected to the Company Database')
);
const db = new CompanyDB(pool)

// switch and case for startingPoint
async function chooseAction(choice) {
    console.log(`Choice: ${choice}`);
    try {
        switch (choice) {
            case 'View all departments':
                try {
                    const selectedDepartments = await db.makeQuery(`SELECT * FROM departments;`);
                    const deptTable = new SelectTable(selectedDepartments.rows, [4, 20]);
                    deptTable.createTable();
                } catch (error) {
                    console.error('Error fetching departments:', error);
                }
                break;
            case 'View all roles':
                try {
                    const selectedRoles = await db.makeQuery(`SELECT r.id, r.title, d.name AS department, r.salary 
                        FROM roles AS r
                        LEFT JOIN departments AS d
                        ON r.department_id = d.id;`);
                    const roleTable = new SelectTable(selectedRoles.rows, [4, 15, 20, 10]);
                    roleTable.createTable();
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
                break;
            case 'View all employees':
                try {
                    const selectedEmployees = await db.makeQuery(`
                    SELECT e.id, e.first_name || ' ' || e.last_name AS employee, 
                    r.title AS title, 
                    d.name AS department, 
                    r.salary AS salary, 
                    m.first_name ||' '|| m.last_name AS manager
                    FROM employees AS e
                    JOIN roles AS r on e.role_id = r.id
                    JOIN departments AS d on r.department_id = d.id
                    LEFT JOIN employees AS m ON e.manager_id = m.id;`);
                    const employeeTable = new SelectTable(selectedEmployees.rows, [4, 30, 15, 20, 10, 30]);
                    employeeTable.createTable();
                } catch (error) {
                    console.error('Error fetching employees:', error);
                }
                break;
            case 'View employees by manager':
            try {
                const questions = await selectManager()
                const selected = await inquirer.prompt(questions)
                const managerId = await db.getIdByName(`SELECT id FROM employees WHERE first_name || ' ' || last_name = $1;`, selected.name)
                if (!managerId) {
                    throw new Error(`No manager found with name: ${selected.name}`);
                }
                const selectedEmployees = await db.makeQuery(`SELECT first_name ||' '|| last_name AS Employee
                FROM employees WHERE manager_id = $1;`, [managerId.id]);
                const employeeTable = new SelectTable(selectedEmployees.rows, [30]);
                employeeTable.createTable();
            } catch (error) {
                console.log(`Error getting employees by manager`);
            }
            break;
            case 'View employees by department':
            try {
                const questions = await selectDepartment()
                const selected = await inquirer.prompt(questions)
                const  departmentId = await db.getIdByName(`SELECT id FROM departments WHERE name = $1;`, selected.name)
                const  departmentRoleId = await db.getIdByName(`SELECT id FROM roles WHERE department_id = $1;`, departmentId.id)
                const selectedEmployees = await db.makeQuery(`SELECT e.first_name ||' '|| e.last_name AS employee, d.name AS department
                    FROM employees AS e
                    JOIN roles AS r ON e.role_id = $2
                    INNER JOIN departments AS d ON r.department_id = d.id
                    WHERE d.id = $1;`, [departmentId.id, departmentRoleId.id]);
                const employeeTable = new SelectTable(selectedEmployees.rows, [30]);
                employeeTable.createTable();
            } catch (error) {
                console.log(`Error getting employees by manager`);
            }
            break;
            case 'Add a department':
                try {
                    inquirer.prompt(addDepartment).then((dep) => 
                        db.makeQuery(`INSERT INTO departments(name) VALUES ($1);`, [dep.department])
                    )
                    // .then((dep) => console.log(`Success! ${dep.department} added.`))
                } catch (error) {
                    console.error('Error adding department:', error);
                }
                break;
            case 'Add a role':
                try {
                    const questions = await addRole()
                    const added = await inquirer.prompt(questions)
                    const  departmentId = await db.getIdByName(`SELECT id FROM departments WHERE name = $1;`,added.department)
                    await db.makeQuery(`INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3);`, [added.name, added.salary, departmentId.id])
                    console.log(`Success! ${added.name} has been added!`)
                } catch (error) {
                    console.error('Error adding role:', error);
                }
                break;
            case 'Add an employee':
                try {
                    const questions = await addEmployee()
                    const added = await inquirer.prompt(questions)
                    const roleId = await db.getIdByName(`SELECT id FROM roles WHERE title = $1`, added.role)
                    const managerId = await db.getIdByName(`SELECT id FROM employees WHERE first_name || ' ' || last_name = $1;`, added.manager)
                    await db.makeQuery(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4);`, [added.firstName, added.lastName, roleId.id, managerId.id])
                    console.log(`Success! ${added.firstName} ${added.lastName} added!`);
                } catch (error) {
                    console.error('Error adding employee:', error);
                }
                break;
            case 'Update employee role':
                try {
                    const questions = await updateRole()
                    const update = await inquirer.prompt(questions) 
                    const roleId = await db.getIdByName(`SELECT id FROM roles WHERE title = $1`, update.role)
                    const employeeId = await db.getIdByName(`SELECT id FROM employees WHERE first_name || ' ' || last_name = $1;`, update.name)
                    await db.makeQuery(`UPDATE employees SET role_id = $2 WHERE first_name ||' '|| last_name = $1;`, [employeeId.id, roleId.id])
                    console.log(`Success! ${update.name} updated with the new role of ${update.role}`)
                } catch (error) {
                    console.error('Error updating employee role:', error);
                }
                break;            
            case 'Update employee manager':
                try {
                    const questions = await updateManager()
                    const update = await inquirer.prompt(questions)
                    const managerId = await db.getIdByName(`SELECT id FROM employees WHERE first_name || ' ' || last_name = $1;`, update.manager)
                    await db.makeQuery(`UPDATE employees SET manager_id = $2 WHERE first_name ||' '|| last_name = $1;`, [update.employee, managerId.id])
                    console.log(`Success! ${update.employee} now has ${update.manager} as a manager.`)
                } catch (error) {
                    console.error('Error updating employee manager:', error);
                }
                break;
            case 'View department budget':
                try {
                    const questions = await selectDepartment()
                    const selected = await inquirer.prompt(questions)
                    const departmentId = await db.getIdByName(`SELECT id FROM departments WHERE name = $1;`, selected.name)
                    const  departmentRoleId = await db.getIdByName(`SELECT id FROM roles WHERE department_id = $1;`, departmentId.id)
                    const selectedSum = await db.makeQuery(`
                    SELECT d.name AS department, SUM(r.salary) AS total
                    FROM roles AS r
                    JOIN employees AS e ON r.id = e.role_id
                    INNER JOIN departments AS d ON r.department_id = d.id
                    WHERE d.id = $1 GROUP BY d.name;`, [departmentRoleId.id])
                    const budget = new SelectTable(selectedSum.rows, [17]);
                    console.log(selectedSum)
                    console.log(budget)
                    budget.createTable();
                    
                } catch (error) {
                    console.log('Error getting budget', error);
                }
                break;    
            case 'Quit':
                console.log('Shut Down');
                break;
            default:
                console.log('Invalid choice');
        }
    } catch (error) {
        console.error('Error during action:', error);
    }
        // choice !== 'Quit' ? init() : pool.end();
};


async function init() {
    try {
        const answer = await inquirer.prompt(startingPoint);
        await chooseAction(answer.action, db);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

init();



module.exports = pool