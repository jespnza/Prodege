//Form Validation

function validateForm() {
	var x = document.forms["form"]["fname"].value;
    if (x == null || x == "") {
        alert("Please fill in your first name");
        return false;
    }
}
//A really simple modal

function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

//A simple carousel 

var t = setInterval(function(){
	$("#carousel ul").animate({marginLeft:-960},1000,function(){
		$(this).find("li:last").after($(this).find("li:first"));
		$(this).css({marginLeft:0});
	})
},5000);