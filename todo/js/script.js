const inputBox = document.querySelector(".dataInput input");
const addBtn = document.querySelector(".dataInput button");
const todoList = document.querySelector(".ToDoList");
const deleteAllBtn = document.querySelector(".footer button");

//################## input box validation ##################

inputBox.onkeyup = ()=>{
	let userEnteredValue = inputBox.value;
	if(userEnteredValue.trim() != 0){
		addBtn.classList.add("active");
	}else{
		addBtn.classList.remove("active");
	}
}

//################## show all tasks from data storage ##################

showTasks();

//################## adding new element to local data storage ##################

addBtn.onclick = ()=>{
	let userEnteredValue = inputBox.value;
	let getLocalStorageData = localStorage.getItem("LS-ToDo");
		if(getLocalStorageData == null){
			listArray = [];
		}else{
			listArray = JSON.parse(getLocalStorageData);
		}
	listArray.push(userEnteredValue);
	localStorage.setItem("LS-ToDo", JSON.stringify(listArray));
	showTasks();
	$("input:text").focus();
	addBtn.classList.remove("active");
}

function keyCode(event) {
	var x = event.keyCode;
	let userEnteredValue = inputBox.value;
	if(x == 13 && inputBox.value != ""){	
		listArray.push(userEnteredValue);
		localStorage.setItem("LS-ToDo", JSON.stringify(listArray));
		showTasks();
		$("input:text").focus();
		addBtn.classList.remove("active");
	}
}

//################## show all tasks function ##################

function showTasks(){
	let getLocalStorageData = localStorage.getItem("LS-ToDo");
	if(getLocalStorageData == null){
		listArray = [];
	}else{
		listArray = JSON.parse(getLocalStorageData); 
	}
	
	const pendingTasksNumb = document.querySelector(".pendingTasks");
	pendingTasksNumb.textContent = listArray.length;
	if(listArray.length > 0){
		deleteAllBtn.classList.add("active");
	}else{
		deleteAllBtn.classList.remove("active");
	}
	
	let newLiTag = "";
	listArray.forEach((element, index) => {
		newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span><span class="icon2" onclick="completeTheTask(${index})"><i class="fas fa-check-circle"></i></span></li>`;
	});
	
	todoList.innerHTML = newLiTag;
	inputBox.value = "";
	}

//################## set completed task status ##################

function completeTheTask(index){
	let getLocalStorageData = localStorage.getItem("LS-Completed");
		if(getLocalStorageData == null){
			listArray = [];
		}else{
			listArray = JSON.parse(getLocalStorageData);
		}
	listArray.push(index);
	localStorage.setItem("LS-Completed", JSON.stringify(listArray));
	listArray.splice(index, 1);
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
			let getLocalStorageData = localStorage.getItem("LS-ToDo");
			listArray = JSON.parse(getLocalStorageData);
			listArray.splice(index, 1);
			localStorage.setItem("LS-ToDo", JSON.stringify(listArray));
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

deleteAllBtn.onclick = ()=>{
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
	       localStorage.setItem("LS-ToDo", JSON.stringify(listArray));
	       showTasks();
        Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}