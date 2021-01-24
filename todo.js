const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "pending";
const FINISHED_LS = "finished";

let pendingKey = [];
let finishedKey = [];
let idNumbers = 1;

function delToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li);
  if (li.parentNode === pendingList) {
    pendingList.removeChild(li);
    const cleanToDos = pendingKey.filter(function (pending) {
      return pending.id !== parseInt(li.id);
    });
    pendingKey = cleanToDos;
    saveToDos();
  } else if (li.parentNode === finishedList) {
    finishedList.removeChild(li);
    const cleanFinished = finishedKey.filter(function (finished) {
      return finished.id !== parseInt(li.id);
    });
    finishedKey = cleanFinished;
    saveFinToDos();
  }
}

function changeToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const pendingText = li.lastChild.innerText;
  paintFinished(pendingText);
  pendingList.removeChild(li);
  const cleanToDos = pendingKey.filter(function (pending) {
    return pending.id !== parseInt(li.id);
  });
  pendingKey = cleanToDos;
  saveToDos();
}

function reToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const finishedText = li.lastChild.innerText;
  paintPending(finishedText);
  finishedList.removeChild(li);
  const cleanFinished = finishedKey.filter(function (finished) {
    return finished.id !== parseInt(li.id);
  });
  finishedKey = cleanFinished;
  saveFinToDos();
}

function saveFinToDos() {
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedKey));
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingKey));
}

function paintFinished(text) {
  // console.log(`fin ${text}`);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const reBtn = document.createElement("button");
  const finspan = document.createElement("span");
  const newID = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", delToDo);
  reBtn.innerHTML = "💦";
  reBtn.addEventListener("click", reToDo);
  finspan.innerText = text;
  li.appendChild(reBtn);
  li.appendChild(delBtn);
  li.appendChild(finspan);
  finishedList.appendChild(li);
  li.id = newID;
  const toDoObj = {
    text: text,
    id: newID,
  };
  finishedKey.push(toDoObj);
  saveFinToDos();
}

function paintPending(text) {
  // console.log(`pending ${text}`);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const penspan = document.createElement("span");
  const newID = idNumbers;
  idNumbers += 1;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", delToDo);
  finBtn.innerHTML = "✅";
  finBtn.addEventListener("click", changeToDo);
  penspan.innerText = text;

  li.appendChild(finBtn);
  li.appendChild(delBtn);
  li.appendChild(penspan);
  pendingList.appendChild(li);
  li.id = newID;
  const toDoObj = {
    text: text,
    id: newID,
  };
  pendingKey.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintPending(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedPendingList = localStorage.getItem(PENDING_LS);
  const loadedFinishedList = localStorage.getItem(FINISHED_LS);
  if (loadedPendingList !== null) {
    const parsedToDos = JSON.parse(loadedPendingList);
    parsedToDos.forEach(function (pendingToDo) {
      paintPending(pendingToDo.text);
    });
  }
  if (loadedFinishedList !== null) {
    const parsedToDos = JSON.parse(loadedFinishedList);
    parsedToDos.forEach(function (finishedToDo) {
      paintFinished(finishedToDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();

//------------------------------------------------------------//

// Nico solution

// import "./styles.css";

// const pendingList = document.getElementById("js-pending"),
//   finishedList = document.getElementById("js-finished"),
//   form = document.getElementById("js-form"),
//   input = form.querySelector("input");

// const PENDING = "PENDING";
// const FINISHED = "FINISHED";

// let pendingTasks, finishedTasks;

// function getTaskObject(text) {
//   return {
//     id: String(Date.now()),
//     text,
//   };
// }

// function savePendingTask(task) {
//   pendingTasks.push(task);
// }

// function findInFinished(taskId) {
//   return finishedTasks.find(function (task) {
//     return task.id === taskId;
//   });
// }

// function findInPending(taskId) {
//   return pendingTasks.find(function (task) {
//     return task.id === taskId;
//   });
// }

// function removeFromPending(taskId) {
//   pendingTasks = pendingTasks.filter(function (task) {
//     return task.id !== taskId;
//   });
// }

// function removeFromFinished(taskId) {
//   finishedTasks = finishedTasks.filter(function (task) {
//     return task.id !== taskId;
//   });
// }

// function addToFinished(task) {
//   finishedTasks.push(task);
// }

// function addToPending(task) {
//   pendingTasks.push(task);
// }

// function deleteTask(e) {
//   const li = e.target.parentNode;
//   li.parentNode.removeChild(li);
//   removeFromFinished(li.id);
//   removeFromPending(li.id);
//   saveState();
// }

// function handleFinishClick(e) {
//   const li = e.target.parentNode;
//   li.parentNode.removeChild(li);
//   const task = findInPending(li.id);
//   removeFromPending(li.id);
//   addToFinished(task);
//   paintFinishedTask(task);
//   saveState();
// }

// function handleBackClick(e) {
//   const li = e.target.parentNode;
//   li.parentNode.removeChild(li);
//   const task = findInFinished(li.id);
//   removeFromFinished(li.id);
//   addToPending(task);
//   paintPendingTask(task);
//   saveState();
// }

// function buildGenericLi(task) {
//   const li = document.createElement("li");
//   const span = document.createElement("span");
//   const deleteBtn = document.createElement("button");
//   span.innerText = task.text;
//   deleteBtn.innerText = "❌";
//   deleteBtn.addEventListener("click", deleteTask);
//   li.append(span, deleteBtn);
//   li.id = task.id;
//   return li;
// }

// function paintPendingTask(task) {
//   const genericLi = buildGenericLi(task);
//   const completeBtn = document.createElement("button");
//   completeBtn.innerText = "✅";
//   completeBtn.addEventListener("click", handleFinishClick);
//   genericLi.append(completeBtn);
//   pendingList.append(genericLi);
// }

// function paintFinishedTask(task) {
//   const genericLi = buildGenericLi(task);
//   const backBtn = document.createElement("button");
//   backBtn.innerText = "⏪";
//   backBtn.addEventListener("click", handleBackClick);
//   genericLi.append(backBtn);
//   finishedList.append(genericLi);
// }

// function saveState() {
//   localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
//   localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
// }

// function loadState() {
//   pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
//   finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
// }

// function restoreState() {
//   pendingTasks.forEach(function (task) {
//     paintPendingTask(task);
//   });
//   finishedTasks.forEach(function (task) {
//     paintFinishedTask(task);
//   });
// }

// function handleFormSubmit(e) {
//   e.preventDefault();
//   const taskObj = getTaskObject(input.value);
//   input.value = "";
//   paintPendingTask(taskObj);
//   savePendingTask(taskObj);
//   saveState();
// }

// function init() {
//   form.addEventListener("submit", handleFormSubmit);
//   loadState();
//   restoreState();
// }
// init();
