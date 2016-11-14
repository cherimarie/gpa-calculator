/*
  This web application helps a user calculate a GPA for their courses.

  User enters a name and grade for each course via a form. We build a list of these courses,
  and print it to the page every time it changes (on form submit).

  When user clicks the "calculate" button, we get the average of the grades for each
  course in the list, and print it to the page.

  When user clicks "clear" button, the list of courses is emptied.
  The page is updated to remove the old list and any previously calculated GPA.
*/

// Constructor to build new course objects.
function Course(name, grade){
  this.name = name;
  this.grade = grade;
}

// Global variable to hold list of courses.
var courseList = [];

// Assign functions to submission of the course form, click of two buttons.
window.onload = function(){
  document.getElementById("course-form").onsubmit = formHandler;

  document.getElementById("clear").onclick = clearList;

  document.getElementById("calculate").onclick = calculateAverage;
}

// Triggered on form submit. Creates a new course object and pushes it into courseList array; clears content in form fields; prints courseList objects to the page.
function formHandler(){
  var grade = parseFloat(this.elements["grade"].value);
  // should courseList really be maintained here? and return functions that can be used to add to or clear list?

  /*TODO validate that "grade" value is a number between 1 and 4.

    Checking 'grade typeof "number"' will always return true because we called parseFloat.
    We must check that it's value is not NaN.

    Or is there a way we could use HTML to do it?
    http://w3schools.pro.edu/html/html_form_input_types.asp
  */
  courseList.push(new Course(this.elements["course-name"].value, grade));

  clearFormFields();
  outputList();

  // Prevent form from trying to submit to a server.
  return false;
}

// Triggered by clicking "clear". Empties global courseList array, removes list items and GPA calculation from page text.
function clearList(){
  courseList = [];
  outputList();
  clearGPA();
}

// Calculate the average of "grade" attribute for each object in courseList array and prints average in friendly message to page text.
function calculateAverage(){
  var sum = 0;
  for(i=0;i<courseList.length;i++){
    sum += courseList[i].grade;
  }

  var avg = sum / courseList.length;
  document.getElementById("result").innerHTML = "Your overall GPA is " + avg;
}

// Removes GPA calculation from page text.
function clearGPA(){
  document.getElementById("result").innerHTML = null;
}

// Clears content in form fields.
function clearFormFields(){
  var courseForm = document.getElementById('course-form');

  courseForm.elements["course-name"].value = "";
  courseForm.elements["grade"].value = "";
}

// Prints courseList objects to the page in a readable way.
function outputList(){
  var list = document.getElementById("course-list");
  list.innerHTML = null;

  for (i = 0; i < courseList.length; i++) {
    // Create an <li> node
    var node = document.createElement("LI");

    // Create a text node
    var textnode = document.createTextNode(courseList[i].name + " - " + courseList[i].grade);

    // Append/add the text to <li>
    node.appendChild(textnode);

    // Append/add the <li> to the selected <ul> element
    list.appendChild(node);
  }
}
