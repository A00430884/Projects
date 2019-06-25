var SERVER_URL = 'http://dev.cs.smu.ca:8141';

function saveUniversityForm() {

	//first get the values from the fields 
	var name = $("#name").val();
	var address = $("#address").val();
	var phone = $("#phone").val(); 

	checkValidation(name,address,phone);

}

function checkValidation(name, address, phone)  {
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

    //check phone number
    var tokens = phone.split('-');

	for (var i = 0; i < tokens.length; i++) {
		console.log(tokens[i]);
	    if (isNaN(tokens[i])) {
	        alert("Please use only numbers or hyphens!");
	        $("#phone").focus();
	        return false;
	    }//end if
	}//end for

	//check address
	var firstChar = address.trim().substr(0, 1);

	 if (isNaN(firstChar)) {
        alert("Address should start with a number!");
        $("#address").focus();
        return false;
    }

    //create an object
	var newObj = {
	    "Name": name,
	    "Address": address,
	    "PhoneNumber": phone
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

	clearUniversityForm();

	//now send the request
	$.post(SERVER_URL + "/saveUniversity",
			newObj,
			function (data) {
				alert("Result saved successfully! Answer: "+data);
			}).fail(function (error) {
		alert("Error: " +error.responseText);
	});


}

function clearUniversityForm() {
	//now clean up the form
	$("#name").val('');
	$("#address").val('');
	$("#phone").val(''); 
}

function searchUniversityForm() {

	//check if exists
	var universities = localStorage.getItem("universities");

	if (universities == null) {
	    //no record whatsoever, let the University know
	    alert("No record found");
	}
	else {
		//if data exist, convert to JSON object
		universities = JSON.parse(universities);

		//go through each record
		for (var i = 0; i < universities.length; i++) {
		var name = universities[i].Name;//Name attribute
		
		//if the name matches
	    if ($('#searchKey').val().toLowerCase() == name.toLowerCase()) {
	        var address = universities[i].Address; // Address attribute
	        var phone = universities[i].PhoneNumber; //PhoneNumber attribute

	        //now fill the fields
	        $("#name").val(name);
	        $("#address").val(address);
	        $("#phone").val(phone);

	        return;//job done, get outa here

		    }//end if
		}//end for
	}
	alert("No record found");

}


function deleteUniversityForm() {

	//check if exists
	var universities = localStorage.getItem("universities");


	if (universities == null) {
	    //no record whatsoever, let the University know
	    alert("No record found");
	}
	else {
		//if data exist, convert to JSON object
		universities = JSON.parse(universities);

		//go through each record
		for (var i = 0; i < universities.length; i++) {
		var name = universities[i].Name;//Name attribute

		//use name field instead of searchKey
	    if ($('#name').val().toLowerCase() == name.toLowerCase()) {

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

	        alert("Record Deleted");

			//now clean up the form
			$("#name").val('');
			$("#address").val('');
			$("#phone").val('');                                

			return;//job done, get outa here
			}
		}
	alert("No record found");
	}
}

function displayUniversityForm() {

	//check if exists
	var universities = localStorage.getItem("universities");


	if (universities == null) {
	    //no record whatsoever, let the University know
	    alert("No record found");
	}
	else {
		//if data exist, convert to JSON object
		universities = JSON.parse(universities);

		//Initializing the table
		$("#displayTable").html(
			"   <tr>" +
			"     <th>Name</th>" +
			"     <th>Address</th>" +
			"     <th>Phone</th>" +
			"   </tr>"
			);

		//use a familiar general JS table object from here
		//the expense tracker app uses a different way
		var table = document.getElementById('displayTable');

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
}