"use strict";

$("#taskInputForm").submit(saveTask);

window.addEventListener('DOMContentLoaded',()=>{
  fetchTasks();
})
window.addEventListener('DOMContentLoaded',()=>{
  deleteTask();
})
window.addEventListener('DOMContentLoaded',()=>{
  setOpacity();
})

window.addEventListener('DOMContentLoaded',()=>{
  restTask();
})



function saveTask(e){
  let NameVal = $("#task-name").val();
  let SeverityVal = $("#task-severity").val();
  let DateVal = $("#task-deadline").val();
  let taskId = chance.guid();
  let UrlVal = $("#task-url").val();
  let taskStatus = 'TODO';

  let task = {
    id: taskId,
    name: NameVal,
    severity: SeverityVal,
    date: DateVal,
    url: UrlVal,
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
  let taskList = $("#taskList");
  let taskHTML = '';
  
  for(let i=0;i<tasks.length;i++){
    let id = tasks[i].id;
    let name = tasks[i].name;
    let severity = tasks[i].severity;
    let date = tasks[i].date;
    let status = tasks[i].status;
    let url = tasks[i].url;

    taskHTML += '<div class="well" data='+ id +' draggable="true" id=item'+ i +'>'+
    '<p><span class="label label-info">状態:</span>'+ status + ' /</p>'+
    '<h3>タスク名：' + name + ' /</h3>'+
    '<p><span class="glyphicon glyphicon-time">優先度：</span> ' + severity + ' /</p>'+
    '<p><span class="glyphicon glyphicon-deadline">締切日：</span> ' + date + ' /</p>'+ 
    '<p><span class="glyphicon glyphicon-url">URL: </span> ' +'<a href=' + url + ' target="_blank">リンク先 /</a></p>'+ 
    '<a href="#" onclick="setStatusDone(\''+id+'\')" class="btn btn-warning">Finish</a> '+
    '<a href="#" onclick="deleteTask(\''+id+'\')" class="btn btn-danger">Delete</a>'+
    '</div>';
  }
  taskList.html(taskHTML);
}

function restTask(){
  let taskLength = $(".routine-items").length;
  let checkTask = $('input[name="check[]"]:checked').length;
  $("#rest-count").html(taskLength - checkTask);
  $("#achive").html(Math.floor(checkTask*100 / taskLength));

  let condition = Math.floor(checkTask*100 / taskLength);
  if(condition<=33){
    $("#rest-count , #achive").css("backgroundColor","#f33a22");
  }else if(condition<=66){
    $("#rest-count , #achive").css("backgroundColor","#f3b122");
  }else{
    $("#rest-count , #achive").css("backgroundColor","rgb(7, 241, 144)");
  }
}
