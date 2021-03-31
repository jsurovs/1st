//######## selectors //########
const todoInput = document.querySelector(".dataInput input");
const todoDate = document.querySelector("#datepicker");
const todoButton = document.querySelector(".dataInput button");
const todoList = document.querySelector(".ToDoList");
const completeList = document.querySelector(".CompleteList");
const buttonDeleteAll= document.querySelector(".footer button");
const deleteAllCompleted = document.querySelector(".deleteAllCompleted");
const filterOption = document.querySelector('.filter');

const taskStorage = "TodoArray";
const completeTasks = "CompleteArray";

//######## date //########
const date = document.getElementById('date');
const options = {weekday: "long", month: "short", day: "numeric"};
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-LV", options);

$(document).ready(function(){
	showTasks();
});

//######## input box validation //########
// todoInput.onkeyup = ()=>{
$(".dataInput input").on("input change", function(){
	let userEnteredDate = todoDate.value;	
	let userEnteredValue = todoInput.value;

	console.log('changed input');
	
	if(isNaN(userEnteredValue) && userEnteredDate != ""){
		todoButton.classList.add("active");
	}else{
		todoButton.classList.remove("active");
	}
});
//################## show all tasks from data storage //########
showTasks();
showCompleteTasks();
//######## adding new element to local data storage //########
todoButton.onclick = ()=>{
	let userEnteredDate = todoDate.value;	
	let userEnteredValue = todoInput.value;
	if(userEnteredDate.length > 0){
		space = " / Title: "
	} else {
		space = ""
	}
	var userEnteredData = userEnteredDate + space + userEnteredValue;
	let getLocalStorageData = localStorage.getItem("TodoArray");
		if(getLocalStorageData == null){
			listArray = [];
		}else{
			listArray = JSON.parse(getLocalStorageData);
		}
	listArray.push(userEnteredData);
	localStorage.setItem("TodoArray", JSON.stringify(listArray));
	showTasks();
	$("input:text").focus();
	todoButton.classList.remove("active");
}
function keyCode(event) {
	var x = event.keyCode;
	let userEnteredValue = todoInput.value;
	if(x == 13 && todoInput.value != ""){	
		listArray.push(userEnteredValue);
		localStorage.setItem("TodoArray", JSON.stringify(listArray));
		showTasks();
		$("input:text").focus();
		todoButton.classList.remove("active");
	}
}
//######## show all tasks function //########
function showTasks(){
	let getLocalStorageData = localStorage.getItem("TodoArray");
	if(getLocalStorageData == null){
		listArray = [];
	}else{
		listArray = JSON.parse(getLocalStorageData); 
	}
	
	const pendingTasksNumb = document.querySelector(".pendingTasks");
	pendingTasksNumb.textContent = listArray.length;
	if(listArray.length > 0){
		buttonDeleteAll.classList.add("active");
	}else{
		buttonDeleteAll.classList.remove("active");
	}
	
	let newTodo = "";
	listArray.forEach((element, index) => {
		newTodo += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span><span class="icon2" onclick="completeTask(${index})"><i class="fas fa-check-circle"></i></span></li>`;
	});
	
	todoList.innerHTML = newTodo;
	todoInput.value = "";
	todoDate.value = "";	
	}
//######## set completed task status //########

function storageGet(localItem){
	var localItems = localStorage.getItem(localItem);
	return localItems;
}

function completeTask(index) {
	var storage = storageGet(taskStorage);
	var itemArray = JSON.parse(storage);

	// Set as complete
	var task = itemArray[index];
	console.log(task);
	var completed = storageGet(completeTasks);

	if(completed == null){
		var completedTask = [];
		completedTask.push(task);
		var completedString = JSON.stringify(completedTask);
	}else{
		var completedArray = JSON.parse(completed);
		completedArray.push(task);
		var completedString = JSON.stringify(completedArray);
	}

	localStorage.setItem(completeTasks, completedString);

	itemArray.splice(index, 1);
	var itemString = JSON.stringify(itemArray);
	localStorage.setItem(taskStorage, itemString);
	showTasks();	
	showCompleteTasks();
}

//######## delete task function with swal validation //########
function deleteTask(index){
	Swal.fire({
	title: 'Are you sure?',
	text: "You won't be able to revert this!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Yes, delete it!',
	showLoaderOnConfirm: true,
		preConfirm: () => {
    return }
	}).then((result) => {
  		if (result.isConfirmed) {
			let getLocalStorageData = localStorage.getItem("TodoArray", index);
			listArray = JSON.parse(getLocalStorageData);
			listArray.splice(index, 1);
			localStorage.setItem("TodoArray", JSON.stringify(listArray));
			showTasks();
		Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}
//######## delete all tasks function with swal validation //########
buttonDeleteAll.onclick = ()=>{
    	Swal.fire({
	title: 'Are you sure?',
	text: "You won't be able to revert this!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Yes, delete it!',
	showLoaderOnConfirm: true,
		preConfirm: () => {
    return }
	}).then((result) => {
  		if (result.isConfirmed) {
	       listArray = [];
	       localStorage.setItem("TodoArray", JSON.stringify(listArray));
	       showTasks();
        Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}
//######## show complete tasks //########
function showCompleteTasks(){
	let getCompleteLocalStorageData = localStorage.getItem("CompleteArray");
	if(getCompleteLocalStorageData == null){
			listArray2 = [];
		}else{
			listArray2 = JSON.parse(getCompleteLocalStorageData);
		}
	
	const finishedTasksNumb = document.querySelector(".finishedTasks");
	finishedTasksNumb.textContent = listArray2.length;
	if(listArray2.length > 0){
		deleteAllCompleted.classList.add("active");
	}else{
		deleteAllCompleted.classList.remove("active");
	}
	
		let newTodo = "";
	listArray2.forEach((element, index) => {
		newTodo += `<li>${element}<span class="icon" onclick="deleteFinishedTask(${index})"><i class="fas fa-trash"></i></li>`;
	});
	completeList.innerHTML = newTodo;
	todoInput.value = "";
	todoDate.value = "";
}
function deleteFinishedTask(index){
	Swal.fire({
	title: 'Are you sure?',
	text: "You won't be able to revert this!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Yes, delete it!',
	showLoaderOnConfirm: true,
		preConfirm: () => {
    return }
	}).then((result) => {
  		if (result.isConfirmed) {
			let getCompleteLocalStorageData = localStorage.getItem("CompleteArray", index);
			listArray2 = JSON.parse(getCompleteLocalStorageData);
			listArray2.splice(index, 1);
			localStorage.setItem("CompleteArray", JSON.stringify(listArray2));
			showCompleteTasks();
		Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}
deleteAllCompleted.onclick = ()=>{
    	Swal.fire({
	title: 'Are you sure?',
	text: "You won't be able to revert this!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Yes, delete it!',
	showLoaderOnConfirm: true,
		preConfirm: () => {
    return }
	}).then((result) => {
  		if (result.isConfirmed) {
	       listArray2 = [];
	       localStorage.setItem("CompleteArray", JSON.stringify(listArray2));
	       showCompleteTasks();
        Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}