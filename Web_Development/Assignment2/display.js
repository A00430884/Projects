function draw(){

var min = document.getElementById('min').value;
var max = document.getElementById('max').value;


min = Number(min);
max = Number(max);

var tableArray= [];
var j = min;
var i = 0;
while(j < max){
 tableArray[i] = j;
 i++
 j=j+5;
}
//end for
display(tableArray);

}
function display(tableArray){
var dataTable = document.getElementById('displayData');

dataTable.innerHTML = '';//empty

//Header row
var row=dataTable.insertRow(0);
var firstCell=row.insertCell(0);
var secondCell=row.insertCell(1);

firstCell.innerHTML='N';
secondCell.innerHTML='N**2';
//Insert data
for(var i=0; i < tableArray.length; i++)
{
 var row = dataTable.insertRow(-1);
 var firstCell=row.insertCell(0);
 var secondCell=row.insertCell(1);
 firstCell.innerHTML = tableArray[i];
 secondCell.innerHTML = tableArray[i]**2;
}//end for
}