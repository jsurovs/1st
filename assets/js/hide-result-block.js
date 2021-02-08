function submit(){
	
	//Set visible result section
	const newLocal = "visible"; document.getElementById("resultsBlock").style.visibility=newLocal;
	
	//Variables
	var grossSalary = document.querySelector(".grossInput").value;
	var socialEmployeeRate = document.getElementById("socErate").value;
	var incomeTaxRate = document.querySelector(".incomeRate").value;
	var Dependents = document.querySelector(".dependents").value;
	var businessRiskFee = parseFloat(document.querySelector(".resultBusinessRiskFee").value);
	
	//Employee Social Tax
	calcSocE = parseFloat(grossSalary * socialEmployeeRate);
	document.querySelector(".resultSocErate").innerHTML = calcSocE.toFixed(2) + " EUR";
	
	//Corporate Social Tax
	calcSocC = parseFloat(grossSalary * 0.2359);
	document.querySelector(".resultSocCrate").innerHTML = calcSocC.toFixed(2) + " EUR";
	
	//Dependents
	calcDependents = parseFloat(Dependents * 250);
	document.querySelector(".resultDependents").innerHTML = calcDependents.toFixed(2) + " EUR"
	
	//Personal Income Tax
	var calcIINsubtotal = parseFloat(grossSalary-calcSocE-calcDependents);
	calcIIN = parseFloat(calcIINsubtotal*(incomeTaxRate / 100));
	document.querySelector(".resultIncomeTax").innerHTML = calcIIN.toFixed(2) + " EUR";
	
	//Salary calculation
	calcGrossResult = (grossSalary - calcSocE - calcIIN);
	document.querySelector(".resultGross").innerHTML = calcGrossResult.toFixed(2) + " EUR";
	
	//Total employer's expenses
	calcTotal = parseFloat(grossSalary) + calcSocC + parseFloat(businessRiskFee);
	document.querySelector(".resultExpensesSum").innerHTML = calcTotal.toFixed(2) + " EUR";
}