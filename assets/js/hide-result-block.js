function submit(){
	//Set visible result section
	const newLocal = "visible"; document.getElementById("resultsBlock").style.visibility=newLocal;
	
	validation(grossInput);

    //Tax calculation
	
	//Variables
	var grossSalary = document.querySelector(".grossInput").value;
	var socialEmployeeRate = document.getElementById("socErate").value;
	var incomeTaxRate = document.querySelector(".incomeRate").value;
	var Dependents = document.querySelector(".dependents").value;
	
	//Employee Social Tax
	calcSocE = parseFloat(grossSalary * socialEmployeeRate);
	document.querySelector(".resultSocErate").innerHTML = calcSocE.toFixed(2) + " EUR";
	
	//Corporate Social Tax
	calcSocC = parseFloat(grossSalary * 0.2359);
	document.querySelector(".resultSocCrate").innerHTML = calcSocC.toFixed(2) + " EUR";
	
	//Personal Income Tax
	calcDependents = parseFloat(Dependents * 250);
	calcIIN = parseFloat((grossSalary-calcSocE)*incomeTaxRate);
	document.querySelector(".resultIncomeTax").innerHTML = calcIIN.toFixed(2) + " EUR";
};


function validation(grossInput){
	var grossSalary = document.querySelector(".grossInput").value;
    if(isNaN(grossSalary) || grossSalary = 0){
        alert("Ievadi pareizi algas apjomu");
    }else if(grossSalary == ""){
        alert("Ievades lauks tukšs");
    }
}