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
  // TODO: add click listeners to th elements for sortTable
  $("#firstName, #lastName, #idNumber, #jobTitle, #annualSalary").on(
    "click",
    sortTable
  );
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
  if (!isNaN(annualSalary)) {
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
    // pass the employee's annualSalary to the calcMonthlyCost function
    calcMonthlyCost(Number(annualSalary));
    // reset input values
    $("#firstNameInput").val("");
    $("#lastNameInput").val("");
    $("#idInput").val("");
    $("#titleInput").val("");
    $("#salaryInput").val("");
  }
  // if salaryInput is not a number:
  else {
    alert("Please enter a valid number");
    $("#salaryInput").val("");
  }
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
let rows = [];
// TODO: function to sort table by firstName, lastName, ID, annualSalary
// researched at https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable() {
  // grab the category for sorting based on the th clicked
  let category = $(this).attr("id");
  // select the table
  let table = document.querySelector("table");
  // select the rows of the table for sorting
  rows = table.rows;
  // declare sorting variables
  let switching = true;
  let direction = "ascend";
  let shouldSwitch;
  let i;
  let switchcount = 0;
  let x;
  let y;
  // loop while rows are being switched
  while (switching) {
    // flip switching so it can be flipped again if a row needs to move
    switching = false;
    // loop over table rows (not header row) and compare each row to the next one
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      // loop over the td's and find the one we want to compare based on the th clicked
      for (let td of rows[i].getElementsByTagName("td")) {
        // use the data value we set in the submit function to find the correct td
        if ($(td).data(category)) {
          x = td;
        }
      }
      // do the same for the row to compare to [i+1]
      for (let td of rows[i + 1].getElementsByTagName("td")) {
        if ($(td).data(category)) {
          y = td;
        }
      }
      // if in ascend mode, checks if current td is greater than the next row's td, if so, flag for switching and break the rows for loop
      // the rows for loop (the first for loop) is broken when a row needs to switch in order to get to the code block that does the visual switching
      if (direction === "ascend") {
        // check if the data value is a string to normalize casing
        if (typeof $(x).data(category) === "string") {
          if (
            $(x).data(category).toLowerCase() >
            $(y).data(category).toLowerCase()
          ) {
            shouldSwitch = true;
            break;
          }
        } else if (typeof $(x).data(category) === "number") {
          if ($(x).data(category) > $(y).data(category)) {
            shouldSwitch = true;
            break;
          }
        }
      }
      // same concepts as the ascend block but comparisons are flipped
      else if (direction === "descend") {
        if (typeof $(x).data(category) === "string") {
          if (
            $(x).data(category).toLowerCase() <
            $(y).data(category).toLowerCase()
          ) {
            shouldSwitch = true;
            break;
          }
        } else if (typeof $(x).data(category) === "number") {
          if ($(x).data(category) < $(y).data(category)) {
            shouldSwitch = true;
            break;
          }
        }
      }
    }
    // checks if a row switch is needed
    if (shouldSwitch) {
      // if so, insert the second row before the first
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      // continue the while loop
      switching = true;
      switchcount++;
    } else {
      // if no switching in done in the current while iteration, the list is properly sorted
      if (switchcount === 0 && direction === "ascend") {
        // direction changes to reverse sorting when clicking on the same th again
        direction = "descend";
        switching = true;
      }
    }
  }
}
