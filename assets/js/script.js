// // Nodokļu gŗamatiņas stāvoklis un IIN nodokļu likme
function taxBookSubmitted(){
	var taxBookStatus = document.getElementById("tax-book").value;
	alert(taxBookStatus);

	var rate;
	if(taxBookStatus = "Jā"){
		rate = "20%"
	} else {
		rate = "23%"
	}
	document.getElementById("iin-rate").innerHTML = rate;
};
