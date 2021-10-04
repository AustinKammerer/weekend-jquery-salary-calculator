# PROJECT NAME

Salary Calculator

## Description

_Week 7 Weekend Project_

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it?

A simple app to display employee names, ID numbers, job titles, and annual salaries in a table based on the user's input. The total monthly cost to the company is calculated and displayed. A monthly cost "soft limit" may also be set and comes with a visual indication.

Initially, I stored employee info using an array of employee objects. However, I ended up eliminating the need for objects by using a combination of the data() and text() methods in JQuery. Instead of storing employee data in objects, it is attached to the table entries themselves. Thus, a loop is not needed for the calculations during addition and deletion of employees. The table may also be sorted by category.

## Usage

How does someone use this application? Tell a user story here.

1. Enter the employee's information in the input fields, click submit.
2. Delete an employee entry using its Delete button.
3. Sort the table rows by clicking on "First Name", "Last Name", "ID", or "Annual Salary"

## Built With

JQuery, Bootstrap
