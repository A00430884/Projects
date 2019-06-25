var SERVER_URL = "http://dev.cs.smu.ca:8148";

// delete data from database
function deleteUniversityForm() {

	if ($("#name").val() != "") {
        var newObj = {
            name: $("#name").val(),
        };
        $.post(SERVER_URL + '/deleteUniversityForm', newObj,
                function (data) {
                    alert(data);
                    clearUniversityForm();
                }).fail(function (error) {
            alert("Error: " + error.responseText);
        });
    } else {
        alert("Enter University Name!");
        $("#name").focus();
    }
}

function checkValidation()  {

	//Get the values from the fields 
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

	//validate phone number
	var tokens = phone.split('-');
	console.log("1: "+tokens);
	for (var i = 0; i < tokens.length; i++) {
		console.log(tokens);
		if (isNaN(tokens[i])) {
			alert("Please use only numbers or hyphens!");
			$("#phone").focus();
			return false;
		}
	}

	//check address
	var firstChar = address.trim().substr(0, 1);

	if (isNaN(firstChar)) {
		alert("Address should start with a number!");
		$("#address").focus();
		return false;
	}

	return true;

}

// Save university data
function saveUniversityForm() {

	if (checkValidation()){

		//creating an object
		var University = {
	      name: $("#name").val(),
	      address: $("#address").val(),
	      phone: $("#phone").val()
	    };

	    console.log(University);

		$.post(SERVER_URL + '/saveUniversityForm', University,
                function (data) {
                    alert(data);
                    clearUniversityForm();
                }).fail(function (error) {
            alert("Error: " + error.responseText);
        });
	}
}

//Search 
function searchUniversityForm() {

	if ($("#searchKey").val() != "") {
        var newObj = {
            name: $("#searchKey").val()
        };

        $.post(SERVER_URL + '/search', newObj,
                function (data) {

                    var uni = data;

                    if (uni == null || uni.length == 0 || uni == "undefined") {
                        alert("No Record For Search Term can be Found");
                    } else {

                    	uni = JSON.parse(data);

                        $("#name").val(uni.name);
                        $("#address").val(uni.address);
                        $("#phone").val(uni.phone);
                    }
                }).fail(function (error) {
            alert("Error: " + error.responseText);
        });
    } else {
        alert("Enter University Name to Search!");
        $("#searchKey").focus();
    }

}

//display 
function displayUniversityForm() {

	$.post(SERVER_URL + '/display',
            function (data) {
                var universities = JSON.parse(data);

                if (universities == null || universities.length == 0) {
                    //no record whatsoever, let the user know
                    alert("No Record Found!");
                    $("#displayTable").html("");
                } else {

            		//Initializing the table
					$("#displayTable").html(
						"   <tr>" +
						"	<th>Name</th>" +
						"     <th>Address</th>" +
						"     <th>Phone</th>" +
						"   </tr>"
						);

					var table = document.getElementById('displayTable');

					//go through each record
					for (var i = 0; i < universities.length; i++) {

						var name = universities[i].name;//name attribute
						var address = universities[i].address; // address attribute
						var phone = universities[i].phone; //phone attribute

						var r = table.insertRow();
						r.insertCell(-1).innerHTML = name;
						r.insertCell(-1).innerHTML = address;
						r.insertCell(-1).innerHTML = phone;

					}
				}
            }).fail(function (error) {
        alert("Error: " + error.responseText);
    });
}
//Clear
function clearUniversityForm() {
	$("#name").val('');
	$("#address").val('');
	$("#phone").val(''); 
}

