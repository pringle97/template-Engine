const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
//installed
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let workers = []

//const for creating a new employee profile
const create = () => {
  //prompting user to enter info for new profile
  inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      message: 'Do you want to create another employee profile?',
    }
  ])
    //if confirmed, adds new profile and writes a new file 
    .then(data => {
      if (data.create == true) {
        addEmployee()
      } else {
        const team = render(workers)
        render(workers)
        fse.outputFile('output/team.html', team, err => {
          if (err) { console.log(err) }
        });
      }
    })
}

//questions for info necessary on profile
const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter your name',
    },
    {
      type: 'input',
      name: 'id',
      message: 'Enter your id',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email',
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is your role?',
      choices: ['Manager', 'Engineer', 'Intern'],
    }
  ])
    //if a manager role, adds manager exclusive properties
    .then(answers => {
      if (answers.role === 'Manager') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'officeNumber',
            message: 'Please type your office number',
          }
        ])
          .then(manager1 => {
            const manager = new Manager(answers.name, answers.id, answers.email, manager1.officeNumber)
            workers.push(manager)
            console.log(workers)
            create()
          })  
      //adding intern exclusive properties
      } else if (answers.role === 'Intern') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'school',
            message: `Enter intern's school name`,
          }
        ])
          .then(intern1 => {
            const intern = new Intern(answers.name, answers.id, answers.email, intern1.school)
            workers.push(intern)
            console.log(workers)
            create()

          })
        //adding engineer exclusive properties
      } else if (answers.role === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'github',
            message: 'Enter github page for engineer',
          }
        ])
          .then(engineer1 => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, engineer1.github)
            workers.push(engineer)
            console.log(workers)
            create()
          })
      }
    })
    .catch(err => console.log(err))
}

//calls function to make the profile 
addEmployee()