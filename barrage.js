// 监听点击发送事件
document.getElementById("send-barrage").addEventListener("click", sendBarrage);
// 监听回车事件
document
  .getElementById("barrage-input")
  .addEventListener("keydown", function (e) {
    if (e.code == "Enter") {
      sendBarrage();
    }
  });
document
  .getElementById("clear-barrages")
  .addEventListener("click", clearBarrages);

/**
 * 发送弹幕
 * 1、判断下是否有输入
 * 2、发射后清空输入框
 */
function sendBarrage() {
  var text = document.getElementById("barrage-input").value;
  if (text) {
    addBarrage(text);
    document.getElementById("barrage-input").value = "";
  }
}

/**
 * 添加弹幕到容器
 * @param {*} text 弹幕文本内容
 */
function addBarrage(text) {
  var barrage = generateBarrage(text);
  // 添加弹幕至容器
  var container = document.getElementById("barrage-container");
  container.appendChild(barrage);
  // 设置随机速度
  var speed = Math.random() * 4 + 1;
  moverBarrage(barrage, speed);
}

/**
 * 开始移动弹幕
 * @param {*} barrage 弹幕 element
 * @param {*} speed 速度
 */
function moverBarrage(barrage, speed) {
  // 弹幕移动
  var move = function () {
    var left = barrage.offsetLeft;
    if (left <= -barrage.offsetWidth) {
      // 清除
      barrage.parentNode && barrage.parentNode.removeChild(barrage);
    } else {
      barrage.style.left = left - speed + "px";
      requestAnimationFrame(move);
    }
  };

  requestAnimationFrame(move);
}

/**
 * 清空全部弹幕
 */
function clearBarrages() {
  var container = document.getElementById("barrage-container");
  container.innerHTML = "";
}

function generateBarrage(text) {
  var barrage = document.createElement("div");

  // 设置随机颜色、大小和速度
  var color = randomColor();
  var size = Math.random() * 20 + 16;

  // 设置弹幕样式
  barrage.style.color = color;
  barrage.style.fontSize = size + "px";
  barrage.style.left = "100%";
  barrage.style.top = Math.random() * 360 + "px";
  barrage.className = "barrage";
  barrage.textContent = text;

  return barrage;
}

// 获取随机颜色
function randomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
