"use strict";

//========================================
// ドロップダウンメニュー
//========================================
$('.header-nav-list').find('.dropdown-menu').hide();
$('.header-nav-list').hover(function(){
  //.dropdown-menuをslideDown
  $(".dropdown-menu:not(:animated)", this).slideDown();
  //hoverが外れた場合
    }, function(){
  //.dropdown-menuをslideUp
  $(".dropdown-menu",this).slideUp();
});

//========================================
//ルーティンタスク表示
//========================================
let routineHTML =  ""; 
let routineList = [
  {
    link : "https://www.ap-siken.com/apkakomon.php",
    content : "応用情報技術者AM",
  },
  {
    link : "https://www.ap-siken.com/apkakomon_pm.php",
    content : "応用情報技術者PM",
  },
  {
    link : "https://www.kaggle.com/",
    content : "Kaggle",
  },
  {
    link : "https://yutaroogawa.github.io/pytorch_tutorials_jp/",
    content : "Pytorch",
  },
  {
    link : "#",
    content : "インターンに向けて",
  },
  {
    link : "#",
    content : "POSSE学習",
  }
]
for(let i=0; i<routineList.length;i++){
  let link = routineList[i].link ? routineList[i].link : '';
  routineHTML += `<li class="routine-items">
  <div class="toggle-switch">
    <input type="checkbox" id="toggle${i}" name="check[]" class="button checkBtn" data="${i}" onchange="fav(${i})" onclick="setSelected(${i})"/>
    <label for="toggle${i}" class="border"></label>
  </div>
  <abbr title="リンクに飛びます"><a href="${link}" target="_blank">${routineList[i].content}</a></abbr><input type="text" class="form-control" data="${i}" value=0>
</li>`
}

$("#routine-list").html(routineHTML);
//========================================
//チェックボックスの保存
//========================================

let FavElements;
let FavLoad;

window.addEventListener('DOMContentLoaded',()=>{
  fetchCheck();
  setTime();
  assignmentTime();
  // リロードするとタイマーが一時停止し、startで再開する
  //トグルボタン：リロード後もう一回押して戻してからrecordを押す！！
})

function fetchCheck(){
  $(".checkBtn").each(function(index){
    FavLoad = JSON.parse(localStorage.getItem("checkbox_checked"+ index));
    if (FavLoad == true){
      $(this).prop("checked",true);
    }
  })
}

function fav(id){
  $(".checkBtn").each(function(index){
    if(id==index){
      if ($(this).prop("checked")){
        localStorage.setItem("checkbox_checked"+ index, JSON.stringify(true));
      } else {
        localStorage.setItem("checkbox_checked"+ index, JSON.stringify(false));
      }
      fetchCheck();
      restTask();
    }
  })
}

function setSelected(id){
  $(".checkBtn").each(function(index,check){
    if($(check).is('[selected]')){
      $(check).removeAttr("selected");
    }
    if(index==id){
      $(check).attr("selected","selected");
    }
  })
}

// =======================================
// タイマー
// =======================================
let counter;
function countTime(){
  if(localStorage.getItem('time')==null){
    let time = 0;
    localStorage.setItem('time',JSON.stringify(time));
  }else{
    let time = JSON.parse(localStorage.getItem('time'));
    time++;
    $("#sec").html(time%60);
    $("#min").html(Math.floor(time/60));
    localStorage.setItem('time',JSON.stringify(time));
  }
}
// もしスタートボタンが不活性化ならばスタートを活性化し、ストップを不活性化する
function toggle(){
  if($("#start").prop('disabled')){
    $("#start").prop('disabled',false);
    $("#stop").prop('disabled',true);
  }else{
    $("#start").prop('disabled',true);
    $("#stop").prop('disabled',false);
  }
}
$("#start").on("click",function(){
  toggle();
  counter = setInterval(countTime,1000);
})
$("#stop").on("click",function(){
  toggle();
  clearInterval(counter);
})
$("#reset").on("click",function(){
  $("#min").html(0);
  $("#sec").html(0);
  toggle();
  clearInterval(counter);
  timeReset();
})

$("#record").on("click",function(){
  setTime();
  clearInterval(counter);
  $("#min").html(0);
  $("#sec").html(0);
  timeReset();
})

function timeReset(){
  let time = JSON.parse(localStorage.getItem('time'));
  time=0;
  localStorage.setItem('time',JSON.stringify(time));
}

function assignmentTime(){
  let time = JSON.parse(localStorage.getItem('time'));
  $("#sec").html(time%60);
  $("#min").html(Math.floor(time/60));
  localStorage.setItem('time',JSON.stringify(time));
}

// ======================
// 経過時間と累計時間の保持
// ======================
function setTime(){
  if(localStorage.getItem('routineItem')==null){
    let eachTime = [];
    for(let i=0;i<$(".routine-items").length;i++){
      eachTime.push(0);
      localStorage.setItem('routineItem',JSON.stringify(eachTime));
    } 
  }else{
    let selectedData = $('.button[selected="selected"]').attr("data");
    let routineTime = JSON.parse(localStorage.getItem('routineItem'));
    let time = JSON.parse(localStorage.getItem('time'));
    $(".form-control").each(function(index){
      $(this).val(routineTime[index]);
      if(Number(selectedData) === index){
        routineTime[index] += time ;
        $(this).val(Math.floor(routineTime[index]/60));
        localStorage.setItem('routineItem',JSON.stringify(routineTime));
      }
    })
    localStorage.setItem('time',JSON.stringify(time));
  }
}


// ======================
// 時間とトグルボタンの初期化
// ======================
// function clearInput(){
//   //時間とトグルボタンの要素持ってくる
//   localStorage.getItem(,);
// }



