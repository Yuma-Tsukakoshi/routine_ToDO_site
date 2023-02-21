"use strict";

$("#taskInputForm").submit(saveTask);

window.addEventListener('DOMContentLoaded',()=>{
  fetchTasks();
})
window.addEventListener('DOMContentLoaded',()=>{
  setOpacity();
})


function saveTask(e){
  let NameVal = $("#task-name").val();
  let SeverityVal = $("#task-severity").val();
  let DateVal = $("#task-deadline").val();
  let taskId = chance.guid();
  let taskStatus = 'TODO';

  let task = {
    id: taskId,
    name: NameVal,
    severity: SeverityVal,
    date: DateVal,
    status : taskStatus
  }

  //parse => JSON 文字列を取得し、JavaScriptオブジェクトに変換
  //stringfy => JavaScriptオブジェクトをJSON 文字列に変換

  // ===========
  //  配列にpushするときは辞書型配列に変換してから(parse)
  //  pushしたらJSON配列にすぐに戻す(stringfy)
  // ===========

  if(localStorage.getItem("tasks")==null){
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }else{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  $("#taskInputForm").trigger("reset");
  fetchTasks();
  setOpacity();
  e.preventDefault();
}

function setStatusDone(id){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].id == id){
      tasks[i].status = 'Done';
    }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks));

  fetchTasks();
  setOpacity();
}

function setOpacity(){
  let taskElements = document.querySelectorAll(".well");
  taskElements.forEach(taskElement=>{
    // console.log(taskElement)
    let taskcontent = taskElement.querySelector("p");
    let taskFirstIndex = taskcontent.innerText.indexOf(':');
    let taskStatus = taskcontent.innerText.substr(taskFirstIndex+1,4);
    if(taskStatus == "Done"){
      taskElement.classList.add('opacity');
    }
  })
}

function deleteTask(id){
  let tasks = JSON.parse(localStorage.getItem('tasks'));

  for(let i=0; i<tasks.length ; i++){
    if(tasks[i].id == id){
      tasks.splice(i,1)
    }
  }
  localStorage.setItem('tasks',JSON.stringify(tasks));
  
  fetchTasks();
  setOpacity();
}

function fetchTasks(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let taksList = $("#taskList");
  let taskHTML = '';
  
  for(let i=0;i<tasks.length;i++){
    let id = tasks[i].id;
    let name = tasks[i].name;
    let severity = tasks[i].severity;
    let date = tasks[i].date;
    let status = tasks[i].status;

    taskHTML += '<div class="well" data='+ id +'>'+
    '<h6>Task ID: ' + id + '</h6>'+
    '<p><span class="label label-info">状態:</span>'+ status + ' /</p>'+
    '<h3>タスク名：' + name + ' /</h3>'+
    '<p><span class="glyphicon glyphicon-time">優先度：</span> ' + severity + ' /</p>'+
    '<p><span class="glyphicon glyphicon-user">締切日：</span> ' + date + ' /</p>'+ 
    '<a href="#" onclick="setStatusDone(\''+id+'\')" class="btn btn-warning">Finish</a> '+
    '<a href="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger">Delete</a>'+
    '</div>';
  }
  taksList.html(taskHTML);

}

