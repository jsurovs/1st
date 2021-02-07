function submitFunction(){
	var a = document.getElementById("brutoAmount").value;
	document.getElementById("salaryResult").innerHTML = a;
	document.getElementById("blockDarbaAlgaResult").style.visibility = "visible";
};


function taxBookIssued(){
	var a = document.getElementById("taxbook").value;
	if (a == "true"){
		document.getElementById("iin-rate").innerHTML = 20;
		alert("a")
	}
}