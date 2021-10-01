$(readyNow);
// TODO: declare array to hold employee objects
let employees = [];

function readyNow() {
  // TODO: add click listener to submitBtn
  $("#submitBtn").on("click", submitEmployeeInfo);
  // TODO: add click listener to future deleteBtn (dynamic)
}

// TODO: function to collect input values and add to employee object array
// collects employee first name, last name, ID number, job title, annual salary
function submitEmployeeInfo() {
  // gather inputs and save to object
  let firstName = $("#firstNameInput").val();
  let lastName = $("#lastNameInput").val();
  let idNumber = $("#idInput").val();
  let jobTitle = $("#titleInput").val();
  let annualSalary = $("#salaryInput").val();
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
}

// TODO: function to display employee info in table

// TODO: function to calculate totalMonthlyCost - if greater than 20K, red background

// TODO: function to delete employee entry from table
