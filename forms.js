function validateForm() 

{ 
console.log("validatingForm");

var result=true;

if(!validateField("pwd")) 

result=false;

if(!validateDOB()) 

result=false;

if(!validateField("email"))

 result=false;

if(!validateField("name"))

 result=false;

  

return result;
}

function validateField (id) { 

// Get the input element with the id passed as argument 

var el=document.getElementById(id); 

// Get the user-entered value for that input field 

var value=el.value; 

// Get the corresponding error message element

 var err=document.getElementById(id+"-error"); 

// If the value field is empty show an error message 

if (value == "") {     

 }  

else {     

}

err.style.visibility = "visible"; 

el.focus();      

return false; 

err.style.visibility = "hidden"; 

return true; }

function validateField (id) { 

// Get the input element with the id passed as argument 

var el=document.getElementById(id); 

// Get the user-entered value for that input field 

var value=el.value; 

// Get the corresponding error message element

 var err=document.getElementById(id+"-error"); 

// If the value field is empty show an error message 

if (value < 15) {     

 }  

else {     

}

err.style.visibility = "visible"; 

el.focus();      

return false; 

err.style.visibility = "hidden"; 

return true; }




