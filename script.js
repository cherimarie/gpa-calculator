/*
  This web application helps a user calculate a GPA for their classes. They enter a name and grade for each class. We build a list of these classes, and print it to the page every time it changes.

  When user clicks the "calculate" button, we get the average of the grades given for each class, and print it to the page.

  When user clicks "clear" button, the list of classes is emptied.

  build constructor- can take list of args or object literal
  onclic event for form submit
    validate data - use typeof for nubers
    build new object
    put in array
    reprint array to page
  calculate button
    runs func on all objects to get avg
    prints avg to page
  add/remove classes buttons?
*/

function NewClass(name, grade){
  this.name = name;
  this.grade = grade;
}

var classList = [];

window.onload = function(){
  document.getElementById('class-form').onsubmit = formHandler;

  document.getElementById("clear").onclick = clearList;

  document.getElementById("calculate").onclick = calculateAverage;
}

function clearList(){
  classList = [];
  outputList();
  clearGPA();
}

function clearGPA(){
  document.getElementById("result").innerHTML = null;
}

function calculateAverage(){
  var sum = 0;
  for(i=0;i<classList.length;i++){
    sum += classList[i].grade;
  }

  var avg = sum / classList.length;
  document.getElementById("result").innerHTML = "Your overall GPA is " + avg;
}

function formHandler(){
  var grade = parseFloat(this.elements["grade"].value);
  // should classList really be maintained here? and return functions that can be used to add to or clear list?
  //TODO check that grade !== NaN; checking typeof "number" useless because we set it to that. Also that it's value is between 0-4.
  classList.push(new NewClass(this.elements["class-name"].value, grade));
  clearFormFields();
  outputList();
  return false;
}

function clearFormFields(){
  var classForm = document.getElementById('class-form');
  classForm.elements["class-name"].value = "";
  classForm.elements["grade"].value = "";
}

function outputList(){
  var list = document.getElementById("class-list");
  list.innerHTML = null;

  for (i = 0; i < classList.length; i++) {
    // Create an <li> node
    var node = document.createElement("LI");

    // Create a text node
    var textnode = document.createTextNode(classList[i].name + " - " + classList[i].grade);

    // Append/add the text to <li>
    node.appendChild(textnode);

    // Append/add the <li> to the selected <ul> element
    list.appendChild(node);
  }
}
