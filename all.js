// function ValidateNumber(e, pnumber){
//   if (!/^\d+$/.test(pnumber)){
//         e.value = /^\d+/.exec(e.value);
//   }
//   return false;
// }
// onkeyup="return ValidateNumber(this,value)"

var btnCircle = document.querySelector('.btnCircle');
var data = JSON.parse(localStorage.getItem('BMIdata')) || [];

updateList(data); //開始頁面時執行畫面更新


function countBmi() {
  //計算BMI
  var height = document.getElementById('height').value;
  var weight = document.getElementById('weight').value;
  var h = height / 100;
  var BMI = Math.ceil(weight / (h * h) * 100) / 100;

  //宣告各種資料
  var status = '';
  var sideColor = '';
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth();
  var yyyy = today.getFullYear();
  var time = dd + '-' + mm + '-' + yyyy;
  var originClassName = 'btnCircle'

  //設立條件
  //BMI的區間與結果
  if (height == '' || weight == '') {
    alert('請輸入身高體重')
    return;
  }

  if (BMI < 18.5) {
    status = '過輕';
    sideColor = 'level_A';
    btnCircle.className = `${originClassName} btn_A`
    //(方法2) btnCircle.setAttribute('class','oringinClassName btn_A' )
    //(方法3 會有bug)btnCircle.classList.add('btn_A');
  } else if (18.5 <= BMI && BMI < 24) {
    status = '理想';
    sideColor = 'level_B';
    btnCircle.className = `${originClassName} btn_B`
    // btnCircle.classList.add('btn_B');
  } else if (24 <= BMI && BMI < 27) {
    status = '過重';
    sideColor = 'level_C';
    btnCircle.className = `${originClassName} btn_C`
    // btnCircle.classList.add('btn_C');
  } else if (27 <= BMI && BMI < 30) {
    status = '輕度肥胖';
    sideColor = 'level_D';
    btnCircle.className = `${originClassName} btn_D`
    // btnCircle.classList.add('btn_D');
  } else if (30 <= BMI && BMI < 35) {
    status = '中度肥胖';
    sideColor = 'level_E';
    btnCircle.className = `${originClassName} btn_E`
    // btnCircle.classList.add('btn_E');
  } else if (BMI => 35) {
    status = '重度肥胖';
    sideColor = 'level_F';
    btnCircle.className = `${originClassName} btn_F`
    // btnCircle.classList.add('btn_F');
  }

  //建立一個資料格式
  var dateContent = {
    //如果property(key)與value長得一樣，即可省略value
    //例如：status: status,-> status,
    status,
    height,
    weight,
    BMI,
    sideColor,
    time,
  };

  //將資料推進陣列並轉換成字串存進localStorage
  data.unshift(dateContent);
  //unshiht 是推前面
  //push 是推後面
  localStorage.setItem('BMIdata', JSON.stringify(data));

  //清空身高體重
  document.getElementById('height').value = '';
  document.getElementById('weight').value = '';
  
  //畫面更新
  updateList(data);

}

function updateList(item) {
  var str = '';
  for (var i = 0; i < item.length; i++) {
    str += `
    <ul class="dataList ${item[i].sideColor}">
    <li class="status">${item[i].status}</li>
    <li class="BMI">BMI<span> ${item[i].BMI}</span></li>
    <li class="weight">weight<span> ${item[i].weight}kg</span></li>
    <li class="height">height<span> ${item[i].weight}cm</span></li>
    <li class="date">${item[i].time}</li>
    <div class="del" data-index="${i}">刪除</div>
  </ul>`
    // <div class="del">刪除</div>

  }

  console.log(document.querySelector('.listContent'));
  document.querySelector('.listContent').innerHTML = str;

}

// 刪除
var del = document.querySelector('.listContent');
del.addEventListener('click', deleteList, false);

function deleteList(e) {
  console.log(e.target.nodeName)
  if (e.target.nodeName !== 'DIV') { return };

  var checkDel = confirm('確定要刪除嗎？');
  if (checkDel) {
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('BMIdata', JSON.stringify(data));
    updateList(data);
  }else {
    return
  }
}



// 監聽事件
btnCircle.addEventListener('click', countBmi, false);