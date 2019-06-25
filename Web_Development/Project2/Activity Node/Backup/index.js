
function save(){
//create an object

validate();
var newObj = {
    "Name": $("#name").val(),
    "Address": $("#address").val(),
    "PhoneNumber": $("#phone").val()
};
		
	var universities = localStorage.getItem("universities");

// no data stored yet, create a new one
	if (universities == null) {
		universities = [];//if not found, create a new array
	}
	else {
    universities = JSON.parse(universities); //if found convert back to a JSON object
		}//end if-else

		universities.push(newObj); //now add the new object

//the save its string representation
		localStorage.setItem("universities", JSON.stringify(universities));

}
function validate(){
	//first get the values from the fields 
var name = $("#name").val();
 var address = $("#address").val();
 var phone = $("#phone").val(); 

    //check empty fields
    if (name == '') {
        alert("Please enter the name of the university!");
        $("#name").focus();
        return false;
    }
    if (address == '') {
        alert("Please enter the address of the university!");
        $("#address").focus();
        return false;
    }
    if (phone == '') {
        alert("Please enter the phone number of the university!");
        $("#phone").focus();
        return false;
    }
	
	if(phone != ''){
	var tokens = phone.split('-');

   for (var i = 0; i < tokens.length; i++) {
    if (isNaN(tokens[i])) {
        alert("Please use only numbers or hyphens!");
        $("#phone").focus();
        return false;
	}
   }// end for
    }//end if
	
	var firstChar = address.trim().substr(0, 1);
	 if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }
	var pattern = /[a-z]/i;

	if (!(pattern.test(address))) {
    alert("Address should contain letters!");
    $("#address").focus();
    return false;
}


}



function search(){
	var universities =  JSON.parse(localStorage.getItem("universities"));

	if (universities == null) {
    //no record whatsoever, let the user know
    alert("No record found");
}else{
	  for (var i = 0; i < universities.length; i++) {

		var name = universities[i].Name;
	    if ($('#searchKey').val().toLowerCase() == universities[i].Name.toLowerCase()) {
        var address = universities[i].Address; // Address attribute
        var phone = universities[i].PhoneNumber; //PhoneNumber attribute

        //now fill the fields
        $("#name").val(name);
        $("#address").val(address);
        $("#phone").val(phone);

        return;//job done, get outa here

    }//end if
}//end for

		alert("No record found");

	  }
}
function remove(){
	var universities =  JSON.parse(localStorage.getItem("universities"));
	
	for (var i = 0; i < universities.length; i++) {

		var name = universities[i].Name;
	    if ($('#name').val().toLowerCase() == universities[i].Name.toLowerCase()) {
	 //remove item at i, 1 object 
        universities.splice(i, 1);

        if (universities.length == 0) {
            /* No items left in records, remove entire 
             * array from localStorage
             */
            localStorage.removeItem("universities");
        } else {
            //otherwise save it back
            localStorage.setItem("universities", JSON.stringify(universities));
        }
		}
}
}
function displayRecords(){

initTable();

//use a familiar general JS table object from here
//the expense tracker app uses a different way
var table = document.getElementById('displayData');
var universities =  JSON.parse(localStorage.getItem("universities"));
//go through each record
for (var i = 0; i < universities.length; i++) {

    var name = universities[i].Name;//Name attribute
    var address = universities[i].Address; // Address attribute
    var phone = universities[i].PhoneNumber; //PhoneNumber attribute

    var r = table.insertRow();
    r.insertCell(-1).innerHTML = name;
    r.insertCell(-1).innerHTML = address;
    r.insertCell(-1).innerHTML = phone;

}//end for

}
function initTable(){
	$("#displayData").html(
        "   <tr>" +
        "     <th>Name</th>" +
        "     <th>Address</th>" +
        "     <th>Phone</th>" +
        "   </tr>"
        );

}