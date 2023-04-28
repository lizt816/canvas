const cvs = document.getElementById('canvas')  // 获取到上下文
const ctx = cvs.getContext('2d')  // 获得一个绘制2d的画笔

function init() {
  // 按照屏幕的宽高来
  // cvs.width = window.innerWidth   // 因为后面需要用到这宽度，所以不用style
  // cvs.height = window.innerHeight // 因为后面需要用到这高度，所以不用style
  // 兼容缩放比例来
  cvs.width = window.innerWidth * devicePixelRatio
  cvs.height = window.innerHeight * devicePixelRatio
 }
 init()
// 调用上下文 让画笔写文字

// 如果想让主体大小跟着屏幕来，需要设置变量
let fontSize = 10 * devicePixelRatio;   // 默认10个像素
let columuCount = Math.floor(cvs.width / fontSize);  // 算出有多少列
let charIndex = new Array(columuCount).fill(0);  // 创建一个数组，fill给每个数组变成0


// 绘画文字：
function draw(){
 // 让字体变透明，使用一层遮罩，一层一层的去盖
 ctx.fillStyle = 'rgba(0,0,0,0.1)';   // 先把笔变成透明色
 ctx.fillRect(0,0,cvs.width,cvs.height)   // canvas提供的api，快速填充一个区域,把上一块区域铺上色
 ctx.font = fontSize + 'px "Roboto Mono"'   // 设置文字大小，和文字的格式：Roboto Mono  ，和css的font一样
 
 ctx.fillStyle = 'red'   // fill：填充，绘图后的背景颜色
 // 注意：生成的文字在css上会根据基线对其，所以在屏幕上看不见文字
 // ctx.textAlign = 'center' // 字体在指定行居中显示，默认是靠右
 ctx.textBaseline = 'top'  //  字体在当前显示文字的水平线靠上对其，默认是基线
 for (let i = 0; i < columuCount; i++) {
  let text = getRandomChar()    // 生成随机字符
  let x = i*fontSize;         //   字符的宽度成当前下标：屏幕可容纳的字符数量的其中一个下标
  let y = charIndex[i] * fontSize;         // 
  ctx.fillText(text,x,y)     // fillText：绘制成填充文字，位置x，位置y
  // 判断是否到了最底下，如果到了在地下，则归零
  if(y > cvs.height && Math.random() > 0.99){
   charIndex[i] = 0;
  }else{
   charIndex[i]++       // 让 指定绘画的下标改变一个字体的高度
  }
 }
}

function getRandomChar() {
 let str = '小何呵呵笑'
 return str[Math.floor(Math.random()*str.length)]
}

setInterval(() => {
 draw()
}, 100);

