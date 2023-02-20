"use strict";

$("#taskInputForm").submit(saveTask);

window.addEventListener('DOMContentLoaded',()=>{
  fetchTasks();
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

    taskHTML += '<div class="well" style="background-color: #eee;display:flex;margin:16px;padding:16px">'+
    '<h6>Task ID: ' + id + '</h6>'+
    '<p><span class="label label-info">' + status + '</span></p>'+
    '<h3>' + name + '</h3>'+
    '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
    '<p><span class="glyphicon glyphicon-user"></span> ' + date + '</p>'+
    '<a href="#" onclick="setStatusDone(\''+id+'\')" class="btn btn-warning">Close</a> '+
    '<a href="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger">Delete</a>'+
    '</div>';
  }
  taksList.html(taskHTML);
}

