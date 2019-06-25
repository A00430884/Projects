
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
function saveSignUpUser(){
	validate();
var newObj = {
    "FirstName": $("#signupFirstName").val(),
	"LastName": $("#signupLastName").val(),
	"DateOfBirth": $("#dateOfBirth").val(),
	"AddPassword": $("#addPassword").val(),
	"ConfirmPassword": $("#confirmPassword").val(),
	"SINNumber": $("#signupsinNumber").val(),
	"Gender": $("#signgenderType").val(),
    };	
	var users = localStorage.getItem("users");
// no data stored yet, create a new one
	if (users == null) {
		users = [];//if not found, create a new array
	}
	else {
    users = JSON.parse(users); //if found convert back to a JSON object
		}//end if-else

		users.push(newObj); //now add the new object
//the save its string representation
		localStorage.setItem("users", JSON.stringify(users));
}
function validate(){
	//first get the values from the fields 
var firstName = $("#signupFirstName").val();
var lastName = $("#signupLastName").val();
var dateOfBirth = $("#dateOfBirth").val();
var addPassword = $("#addPassword").val();
var confirmPassword = $("#confirmPassword").val();
var sinNo = $("#signupsinNumber").val();
var gender = $("#signgenderType").val();

    //check empty fields
    if (firstName == '' ) {
        alert("Please fill the first name !");
        $("#signupFirstName").focus();
        return false;
    }
	if (lastName == '') {
        alert("Please fill the last name !");
        $("#signupLastName").focus();
        return false;
    }
    if (dateOfBirth == '') {
        alert("Please enter the date of birth");
        $("#dateOfBirth").focus();
        return false;
    }
    if (addPassword == '') {
        alert("Please enter the password");
        $("#addPassword").focus();
        return false;
    }
	 if (confirmPassword == '') {
        alert("Please re-enter the password to confirm");
        $("#confirmPassword").focus();
        return false;
    }
	if (sinNo == '') {
        alert("Please enter the SIN");
        $("#signupsinNumber").focus();
        return false;
    }
	if (gender == '') {
        alert("Please choose the gender");
        $("#signgenderType").focus();
        return false;
    }
	
	if(sinNo != ''){
	var tokens = sinNo.split('-');

   for (var i = 0; i < tokens.length; i++) {
    if (isNaN(tokens[i])) {
        alert("Please use only numbers or hyphens!");
        $("#signupsinNumber").focus();
        return false;
	}
   }// end for
    }//end if
	
}

/** Function to redirect the page on click og login**/
function redirectPage() {
   /* var password = getPassword();
    var userName = getUserName();
    console.log(password);
    console.log(userName);*/
	var users = JSON.parse(localStorage.getItem("users"))
	for(var i=0; i<users.length;i++){
		var userName = users[i].FirstName+' '+users[i].LastName;
    //if the password matches
    if (document.getElementById("username").value === userName )
    {
		if(document.getElementById("passcode").value === users[i].ConfirmPassword){
        //if not agreed yet
        if (localStorage.getItem("agreedToLegal") === null) {

            $("#btnEnter").attr("href","#legalNotice").button();
        } 
        else if (localStorage.getItem("agreedToLegal") === "true") 
        {
              $("#btnEnter").attr("href","#pageMenu").button();
        }
    }
	}
	}
        alert("Incorrect username/password, please try again.");
    
}

/** Function to get the password from the localStorage **/
function getPassword() {
  if (typeof (Storage) === "undefined") {
    alert(
      "Your browser does not support HTML5 localStorage. Try upgrading."
    );
  } 
else if (localStorage.getItem("user") !==null) {
    return JSON.parse(localStorage.getItem("user")).NewPassword;
  } else {
    /*Default password*/
    return "9999";
  }
}


function addNewRecord(){
	window.location.href = "http://dev.cs.smu.ca/~d_murugeppa/Project1/index.html#pageNewRecordForm";
}
function checkAddOrEditRecord(){
	
	/*var firstName = $("#signupFirstName").val();
	if(firstName == null){
		alert("invalid key");
	}else{
		alert(firstName);
	}*/
	var newObj = {
    "LearnedDate": $("#learnedDate").val(),
	"LearningType": $("#txtType").val(),
	"TotalLearned": $("#txtLearned").val(),
    };	
	var records = localStorage.getItem("records");
	
	if (records == null) {
		records = [];//if not found, create a new array
	}
	else {
    records = JSON.parse(records); //if found convert back to a JSON object
		}//end if-else

		records.push(newObj); //now add the new object

//the save its string representation
		localStorage.setItem("records", JSON.stringify(records));
		//window.location.href = "http://dev.cs.smu.ca/~d_murugeppa/Project1/index.html#pageNewRecordForm";
		
		
}

function saveDisclaimer(){
	
	localStorage.setItem("agreedToLegal","true");
  $.mobile.changePage("#pageMenu");
  window.location.reload();

	
}
function saveUserForm(){
	alert("user form");
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