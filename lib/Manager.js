// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee.js')

class Manager extends Employee {
  constructor(name, id, email, getOfficeNumber, role) {
    super(name, id, email)
    this.officeNumber = this.officeNumber
    this.role = 
  }

getRole() {
  return 'Manager'
}
getOfficeNumber() {
  return this.getOfficeNumber
}
}