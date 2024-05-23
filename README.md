# **Company Content Data Base(CCDB)**


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## 📰 Description

A simple CLI you can use to organize employees, departments, and roles.

## 🔎 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## 💾 Installation <a id="installation"></a>

1. Clone the repository to your local machine.
2. Open the terminal and navigate to the directory where you cloned the repository.
3. Run the following command to install the necessary packages:

    ```sh
    npm i
    ```

   This will install `inquirer@8.2.4`, `pg`, and `cli-table3`.


You can clone it from the [GitHub Repo here](https://github.com/ThisTish/CompanyContentDB).

## 🖱️ Usage <a id="usage"></a>

### Setting Up the Database

1. Change the directory to the database folder:

    ```sh
    cd db/
    ```

2. Sign into PostgreSQL with your username:

    ```sh
    psql -U postgres
    ```

3. Enter your password when prompted.
4. Run the following command to set up the schema:

    ```sh
    \i schema.sql
    ```

5. (Optional) Seed the database with initial data:

    ```sh
    \i seeds.sql
    ```

6. (Optional) Run example queries from `queries.sql`.
7. Quit PostgreSQL and go back to the main directory:

    ```sh
    \q
    cd ..
    ```

### To start using

1. Start the application by running:

    ```sh
    node index.js
    ```

2. Follow the prompts to interact with the application. You will be presented with a list of options:

    - **View all departments:** Display all departments.
    - **View all roles:** Display all roles.
    - **View all employees:** Display all employees.
    - **View employees by manager:** Display employees grouped by their manager.
    - **View employees by department:** Display employees grouped by their department.
    - **View department budget:** Display the total salary budget for a department.
    - **Add a department:** Add a new department.
    - **Add a role:** Add a new role.
    - **Add an employee:** Add a new employee.
    - **Update employee role:** Update an employee's role.
    - **Update employee manager:** Update an employee's manager.
    - **Delete a department:** Delete a department.
    - **Delete a role:** Delete a role.
    - **Delete an employee:** Delete an employee.
    - **Quit:** Exit the application.

Each viewing choice will either display the selected data or ask for further specifications to narrow the view. Adding options will prompt you for the necessary information and associated items. Updating choices will present you with a list of items to change and prompt you to make the appropriate changes. The delete options will allow you to remove departments, employees, and roles by selecting the related choice. When you are done, simply select 'Quit'.

### Repeating Use

You can use the application as much as you want by repeating the `node index.js` command.

### Video Walkthrough

[A quick video on how to use.](https://drive.google.com/file/d/14TV8lfM3IUsbTGlRzE6mYdnzXLuFuS1c/view)

## 🌐 Contributing <a id="contributing"></a>


Please contact me with my email provided below.

## ✋ Questions <a id="questions"></a>


If you have any questions, feel free to contact me at:

- *GitHub: [ThisTish](https://github.com/ThisTish)*
- *Contact: tish.sirface@gmail.com*

## 🪪 License <a id="license"></a>

MIT License

        Copyright 2024 Tisha Parry

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 📢 Acknowledgments <a id="acknowledgments"></a>


- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [pg](https://github.com/brianc/node-postgres)
- [cli-table3](https://github.com/cli-table/cli-table3)
