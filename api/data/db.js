const employeesData = require("./employees");
const groupsData = require("./employees");
const locationsData = require("./locations.json");

module.exports = () => ({
  employees: employeesData,
  groups: groupsData,
  locations: locationsData,
});
