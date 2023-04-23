
const cvs = document.getElementById('canvas')  // 获取到上下文
 const ctx = cvs.getContext('2d')  // 获得一个绘制2d的画笔
 function init() {
  // 按照屏幕的宽高来
  cvs.width = window.innerWidth   // 因为后面需要用到这宽度，所以不用style
  cvs.height = window.innerHeight // 因为后面需要用到这高度，所以不用style
 }
 init()

 // 基本的认知
 ctx.beginPath()    // 告诉画笔开会绘画
 ctx.moveTo(100,50)  // moveTo：开始的移动位置
 ctx.lineTo(200,100)// lineTo：根据上一步连线
 ctx.closePath()     // 会自动连接到起始的位置
 ctx.strokeStyle = '#fff'   // stroke：描边，绘图后的边框颜色
 ctx.stroke()         //  绘制成描边
 // ctx.fillStyle = '#fff'   // fill：填充，绘图后的背景颜色
 // ctx.fill()     // 绘制成填充
  
 ctx.beginPath()
 ctx.moveTo(100,50)  // 起始位置，绘制曲线arc会添加起始位置，所以可以不用这函数
 ctx.arc(100,50,3,0,Math.PI*2)
 /*
  * arc: x坐标
  * y坐标
  * 圆的半径
  * 起始弧度tips：3.14大概就是一半的位置，所以4.6开始绘画大概就在正上方位置
  * 弧度的起始角度：一圈就是360° ，圆周率 一圈等于2Π 也就是3.14*2。3.14就是半圈
  * 要画成多大的弧度弧度 Math.PI：就是圆的半圈
  * 默认||false：顺时针画，true：逆时针
 */
 ctx.fillStyle = '#fff'   // fill：填充，绘图后的背景颜色
 ctx.fill()     // 绘制成填充