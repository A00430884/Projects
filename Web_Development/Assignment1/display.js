function add(){
var number1 = document.getElementById("number1").value;
var number2 = document.getElementById("number2").value;
var result = +number1 + +number2;
document.getElementById("result").innerHTML = result;
}
function subtract(){
var number1 = document.getElementById("number1").value;
var number2 = document.getElementById("number2").value;
var result = +number1 - +number2;
document.getElementById("result").innerHTML = result;
}
function multiply(){
var number1 = document.getElementById("number1").value;
var number2 = document.getElementById("number2").value;
var result = +number1 * +number2;
document.getElementById("result").innerHTML = result;
}
function divide(){
var number1 = document.getElementById("number1").value;
var number2 = document.getElementById("number2").value;
var result = +number1 / +number2;
document.getElementById("result").innerHTML = result;
}