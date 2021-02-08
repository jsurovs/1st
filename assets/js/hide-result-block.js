function submit(){
	//Set visible result section
	const newLocal = "visible"; document.getElementById("resultsBlock").style.visibility=newLocal;

    //Tax calculation
	
	//Variables
	var grossSalary = document.querySelector(".grossInput").value;
	var socialEmployeeRate = document.getElementById("socErate").value;
	var incomeTaxRate = document.querySelector(".incomeRate").value;
	
	//Employee Social Tax
	calcSocE = parseFloat(grossSalary * socialEmployeeRate);
	document.querySelector(".resultSocErate").innerHTML = calcSocE.toFixed(2) + " EUR";
	
	//Corporate Social Tax
	calcSocC = parseFloat(grossSalary * 0.2359);
	document.querySelector(".resultSocCrate").innerHTML = calcSocC.toFixed(2) + " EUR";
	
	//Personal Income Tax
	calcIIN = parseFloat((grossSalary-calcSocE)*incomeTaxRate);
	document.querySelector(".resultIncomeTax").innerHTML = calcIIN.toFixed(2) + " EUR";
}