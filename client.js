$(readyNow);
// TODO: declare array to hold employee objects UPDATE: I ended up using methods that do not require objects for data storage
// let employees = [];
// inital monthly cost
let totalMonthlyCost = 0;
// max monthly cost before element turns red
let MONTHLY_SOFT_MAX = 20000;

function readyNow() {
  // TODO: add click listener to submitBtn
  $("#submitBtn").on("click", submitEmployeeInfo);
  // TODO: add click listener to future deleteBtn (dynamic)
  $("tbody").on("click", ".deleteBtn", deleteEmployee);
}

// TODO: function to collect input values and add to employee object array
// collects employee first name, last name, ID number, job title, annual salary
function submitEmployeeInfo() {
  // gather inputs and save to variables
  let firstName = $("#firstNameInput").val();
  let lastName = $("#lastNameInput").val();
  let idNumber = $("#idInput").val();
  let jobTitle = $("#titleInput").val();
  let annualSalary = Number($("#salaryInput").val());
  // create an employee JQ tr object to be added to the DOM
  // each td will have a class corresponding to the data it holds
  let entry = $(`
  <tr>
    <td class="firstNameTD">${firstName}</td>
    <td class="lastNameTD">${lastName}</td>
    <td class="idNumberTD">${idNumber}</td>
    <td class="jobTitleTD">${jobTitle}</td>
    <td class="annualSalaryTD">${formatCurrencyTrimmed(annualSalary)}</td>
    <td class="deleteTD"><button type="button" class="deleteBtn btn btn-danger">Delete</button></td>
  </tr>
  `);

  // attatch data to each td (besides td containing delete button)
  for (let td of entry.children()) {
    if ($(td).attr("class") !== "deleteTD") {
      // set the variable string equal to the td's class and slice off 'TD'
      let classString = `${$(td).attr("class")}`;
      let string = classString.slice(0, -2);
      // set the data value to the text of the td
      let value = $(td).text();
      // convert the text of the annualSalary td to a number for calculations
      if (string === "annualSalary") {
        value = Number(value.slice(1).split(",").join(""));
      }
      // attach the data point using the string and value variables
      $(td).data(string, value);
      // console.log($(td).data(string));
    }
  }

  // append the employee entry to the table body
  $("tbody").append(entry);
  // reset input values
  $("#firstNameInput").val("");
  $("#lastNameInput").val("");
  $("#idInput").val("");
  $("#titleInput").val("");
  $("#salaryInput").val("");
  // pass the employee's annualSalary to the calcMonthlyCost function
  calcMonthlyCost(Number(annualSalary));
}

// TODO: function to calculate totalMonthlyCost - if greater than 20K, red background
function calcMonthlyCost(salary) {
  // take the passed in employee's annualSalary, convert it to monthly, and add it to totalMonthlyCost
  totalMonthlyCost += salary / 12;
  // add totalMonthlyCost to DOM
  $("#totalCostOutput").text(formatCurrency(totalMonthlyCost));
  // toggle the high-cost class (red color) depending on totalMonthlyCost
  $("#totalCostOutput").toggleClass(
    "high-cost",
    totalMonthlyCost > MONTHLY_SOFT_MAX
  );
}
// TODO: function to delete employee entry from table
function deleteEmployee() {
  // access the salary data of the salary td of the deleted tr and make it negative
  let salaryToSubtract =
    0 - $(this).parents("tr").children(".annualSalaryTD").data("annualSalary");
  // console.log(salaryNum);
  // remove the employee's entry from the DOM
  $(this).parents("tr").remove();
  // recalculate totalMonthlyCost
  calcMonthlyCost(salaryToSubtract);
}

// functions to format curreny numbers - src: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatCurrencyTrimmed(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
}
function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(number);
}
