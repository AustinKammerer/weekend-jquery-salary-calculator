$(readyNow);
// TODO: declare array to hold employee objects
let employees = [];

function readyNow() {
  // TODO: add click listener to submitBtn
  $("#submitBtn").on("click", submitEmployeeInfo);
  // TODO: add click listener to future deleteBtn (dynamic)
  $("tbody").on("click", ".deleteBtn", deleteEmployee);
}

// TODO: function to collect input values and add to employee object array
// collects employee first name, last name, ID number, job title, annual salary
function submitEmployeeInfo() {
  // gather inputs and save to object
  let firstName = $("#firstNameInput").val();
  let lastName = $("#lastNameInput").val();
  let idNumber = $("#idInput").val();
  let jobTitle = $("#titleInput").val();
  let annualSalary = Number($("#salaryInput").val());
  let employee = {
    firstName: firstName,
    lastName: lastName,
    idNumber: idNumber,
    jobTitle: jobTitle,
    annualSalary: annualSalary,
  };
  // push object to array
  employees.push(employee);
  // reset input values
  $("#firstNameInput").val("");
  $("#lastNameInput").val("");
  $("#idInput").val("");
  $("#titleInput").val("");
  $("#salaryInput").val("");
  // pass the employee object into the display function
  displayEmployee(employee);
  calcMonthlyCost();
}

// TODO: function to display employee info in table
function displayEmployee(employee) {
  // declare HTML to be added to DOM
  let entry = $(`
  <tr>
    <td>${employee.firstName}</td>
    <td>${employee.lastName}</td>
    <td>${employee.idNumber}</td>
    <td>${employee.jobTitle}</td>
    <td>${employee.annualSalary}</td>
    <td><button type="button" class="deleteBtn btn btn-danger">Delete</button></td>
  </tr>
  `);
  // attach salary data to entry
  entry.data("annualSalary", `${employee.annualSalary}`);
  // append the employee entry
  $("tbody").append(entry);
}
// TODO: function to calculate totalMonthlyCost - if greater than 20K, red background
function calcMonthlyCost() {
  // add up annualSalary of all employees
  let totalMonthlyCost = employees.reduce(function (
    previousValue,
    currentValue
  ) {
    return previousValue + currentValue.annualSalary;
  },
  0);
  // add to DOM
  $("#totalCostOutput").text(totalMonthlyCost);
}
// TODO: function to delete employee entry from table
function deleteEmployee() {}
