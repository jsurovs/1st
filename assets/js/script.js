// // Nodokļu gŗamatiņas stāvoklis un IIN nodokļu likme
function taxBookSubmitted(){
	var status = document.querySelector(".taxBook").value;
	if(status = "20"){
		document.querySelector(".incomeRate").value = "0.20";
	} else if(status = "23"){
		document.querySelector(".incomeRate").value = "0.23";
	}
}