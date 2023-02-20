"use strict";

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
    <input type="checkbox" id="toggle${i}" class="button checkBtn" data="${i}"/>
    <label for="toggle${i}" class="border"></label>
  </div>
  <a href="${link}">${routineList[i].content}</a><input type="text" class="form-control" data="${i}" value=0>
</li>`
}

$("#routine-list").html(routineHTML);
//========================================
//チェックボックスの保存
//========================================

let FavElements;
let FavLoad;

// window.onload = function(){
//   $(".checkBtn").each(function(index){
//     FavLoad = JSON.parse(localStorage.getItem("checkbox_checked"+ index));
//     if (FavLoad == true){
//       FavElements = $(this);
//       FavElements.checked = true;
//     }
//   })
// }

function fav(){
  $(".checkBtn").each(function(index){
    FavElements = $(this);
    //※コンソールを開いてこの文字列を確認してください
    console.log("checkbox_checked"+ FavElements);
    if (FavElements.checked == true){
      localStorage.setItem("checkbox_checked"+ index, JSON.stringify(true));
    } else {
    localStorage.setItem("checkbox_checked"+ index, JSON.stringify(false));
    }
  })
}

// =======================================
// タイマー
// =======================================
let counter;
let time = 0;
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
function count(){
  time++;
  $("#sec").html(time%60);
  $("#min").html(Math.floor(time/60));
}
$("#start").on("click",function(){
  toggle();
  counter = setInterval(count,1000);
})
$("#stop").on("click",function(){
  toggle();
  clearInterval(counter);
})
$("#reset").on("click",function(){
  $("#min").html(0);
  $("#sec").html(0);
  clearInterval(counter);
  time = 0
})

$("#record").on("click",function(){
  let selectedData = $(".button:checked").attr("data");
  $(".form-control").each(function(index){
    if(Number(selectedData) === index){
      // let restTime = $(this).val();
      $(this).val(time);
    }
  })
  clearInterval(counter);
  time = 0;
})
