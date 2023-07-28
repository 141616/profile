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
  var container = document.getElementById("barrage-container");
  var barrage = generateBarrage(text, container);
  // 添加弹幕至容器
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

function generateBarrage(text, container) {
  var barrage = document.createElement("div");

  // 设置随机颜色
  var color = getRandomColor();
  // 大小12-36
  var size = Math.floor(Math.random() * 25) + 12;
  // 高度
  var height = container.clientHeight || 200;

  // 设置弹幕样式
  barrage.style.color = color;
  barrage.style.fontSize = size + "px";
  barrage.style.left = "100%";
  barrage.style.top = Math.random() * height + "px";
  barrage.className = "barrage";
  barrage.textContent = text;

  return barrage;
}

function getRandomColor() {
  // 生成随机色相 (0-360)
  const hue = Math.floor(Math.random() * 360);

  // 设置饱和度 (50-100)
  const saturation = Math.floor(Math.random() * 51) + 50;

  // 设置亮度 (20-80)，确保颜色不太暗或太亮
  const lightness = Math.floor(Math.random() * 61) + 20;

  // 将 HSL 值转换为 CSS 颜色字符串
  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return color;
}
