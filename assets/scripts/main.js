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
    <input type="checkbox" id="toggle${i}" class="button"/>
    <label for="toggle${i}" class="border"></label>
  </div>
  <a href="${link}">${routineList[i].content}</a><input type="text" class="form-control" class="form-control" value=0>
</li>`
}

$("#routine-list").html(routineHTML);