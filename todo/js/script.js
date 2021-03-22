const todoInput = document.querySelector(".dataInput input");
const todoButton = document.querySelector(".dataInput button");
const todoList = document.querySelector(".ToDoList");
const completeList = document.querySelector(".CompleteList");
const buttonDeleteAll= document.querySelector(".footer button");
const filterOption = document.querySelector(".filter");

//################## input box validation ##################

todoInput.onkeyup = ()=>{
	let userEnteredValue = todoInput.value;
	if(userEnteredValue.trim() != 0){
		todoButton.classList.add("active");
	}else{
		todoButton.classList.remove("active");
	}
}

//################## show all tasks from data storage ##################

showTasks();

//################## adding new element to local data storage ##################

todoButton.onclick = ()=>{
	let userEnteredValue = todoInput.value;
	let getLocalStorageData = localStorage.getItem("PendingArray");
		if(getLocalStorageData == null){
			listArray = [];
		}else{
			listArray = JSON.parse(getLocalStorageData);
		}
	listArray.push(userEnteredValue);
	localStorage.setItem("PendingArray", JSON.stringify(listArray));
	showTasks();
	$("input:text").focus();
	todoButton.classList.remove("active");
}

function keyCode(event) {
	var x = event.keyCode;
	let userEnteredValue = todoInput.value;
	if(x == 13 && todoInput.value != ""){	
		listArray.push(userEnteredValue);
		localStorage.setItem("PendingArray", JSON.stringify(listArray));
		showTasks();
		$("input:text").focus();
		todoButton.classList.remove("active");
	}
}

//################## show all tasks function ##################

function showTasks(){
	let getLocalStorageData = localStorage.getItem("PendingArray");
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
		newTodo += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span><span class="icon2" onclick="completeTheTask(${index})"><i class="fas fa-check-circle"></i></span></li>`;
	});
	
	todoList.innerHTML = newTodo;
	todoInput.value = "";
	}

//################## set completed task status ##################

function completeTheTask(index) {
	
	let getLocalStorageData = localStorage.getItem(localStorage.key("PendingArray"));
	let getLocalStorageDataValue = getLocalStorageData.value;

	let getCompleteLocalStorageData = localStorage.getItem("CompleteArray");
		if(getCompleteLocalStorageData == null){
		listArray = [];
		}else{
			listArray = JSON.parse(getCompleteLocalStorageData);
		}
	listArray.push(getLocalStorageDataValue);
	localStorage.setItem("CompleteArray", JSON.stringify(listArray));
	

//	CompleteTodos.push(value);
//	localStorage.setItem("CompleteArray", JSON.stringify(CompleteTodos));
	
	deleteTaskAfterComplete();
}

function deleteTaskAfterComplete(index){
	let getLocalStorageData = localStorage.getItem("PendingArray");
	listArray = JSON.parse(getLocalStorageData);
	listArray.splice(index, 1);
	localStorage.setItem("PendingArray", JSON.stringify(listArray));
	showTasks();
}

//################## delete task function with swal validation ##################

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
			let getLocalStorageData = localStorage.getItem("PendingArray", index);
			listArray = JSON.parse(getLocalStorageData);
			listArray.splice(index, 1);
			localStorage.setItem("PendingArray", JSON.stringify(listArray));
			showTasks();
		Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}

//################## delete all tasks function with swal validation ##################

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
	       localStorage.setItem("PendingArray", JSON.stringify(listArray));
	       showTasks();
        Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}