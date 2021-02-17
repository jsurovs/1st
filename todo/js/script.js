const inputBox = document.querySelector(".dataInput input");
const addBtn = document.querySelector(".dataInput button");
const todoList = document.querySelector(".ToDoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
	let userEnteredValue = inputBox.value; // get user value
	if(userEnteredValue.trim() != 0){ // if values is space
		addBtn.classList.add("active"); //activate the button
	}else{
		addBtn.classList.remove("active"); //unactive the button
	}
}

//#####################################

showTasks(); // show all tasks

//#####################################

addBtn.onclick = ()=>{
	let userEnteredValue = inputBox.value; // get value
	let getLocalStorageData = localStorage.getItem("New Todo"); // get localstorage
		if(getLocalStorageData == null){
			listArray = []; //create array
		}else{
			listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
		}
	listArray.push(userEnteredValue);
	localStorage.setItem("New Todo", JSON.stringify(listArray));
	showTasks();
	$("input:text").focus();
	addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks(){
	let getLocalStorageData = localStorage.getItem("New Todo");
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
		newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
	});
	
	todoList.innerHTML = newLiTag;
	inputBox.value = "";
	}

//#####################################

function deleteTask(index){
	Swal.fire({
	title: 'Are you sure?',
	text: "You won't be able to revert this!",
	icon: 'warning',
	showCancelButton: true,
	confirmButtonColor: '#3085d6',
	cancelButtonColor: '#d33',
	confirmButtonText: 'Yes, delete it!',
	showLoaderOnConfirm: true
	}).then((result) => {
  		if (result.isConfirmed) {
			let getLocalStorageData = localStorage.getItem("New Todo");
			listArray = JSON.parse(getLocalStorageData);
			listArray.splice(index, 1);
			localStorage.setItem("New Todo", JSON.stringify(listArray));
			showTasks();
		Swal.fire(
		'Deleted!',
		'Your file has been deleted.',
		'success'
		)
  		}
	})
}

//#####################################

deleteAllBtn.onclick = ()=>{
	listArray = [];
	localStorage.setItem("New Todo", JSON.stringify(listArray));
	showTasks();
}