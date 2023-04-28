console.log("111")
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
 ctx.fillStyle = 'red'   // fill：填充，绘图后的背景颜色
 ctx.font = fontSize + 'px "Roboto Mono"'   // 设置文字大小，和文字的格式：Roboto Mono  ，和css的font一样
 ctx.fillText('123456',100,100)     // fillText：绘制成填充文字