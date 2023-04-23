// 当前浏览器的缩放倍率window.devicePixelRatio
// canvas生成绘制的都是图片，放大之后会感觉模糊，如何解决呢
// 没有缩放的情况需要保证图片canvas自己的宽高和css样式的宽高保存一致就行了
// 考虑放大的情况，就要加上缩放的倍率
// 1.放大三倍，就缩小三倍
// 2.缩小css的三倍
// 等式：原始尺寸 = css尺寸 * 缩放倍率
// 或者：css尺寸 = 原始尺寸 / 缩放倍率
// 要么放大css尺寸，要么改变原始尺寸反正


const cvs = document.getElementById('canvas')  // 获取到上下文
 const ctx = cvs.getContext('2d')  // 获得一个绘制2d的画笔
 function init() {
  // 注意，这里的css样式尺寸是200
  // 兼容缩放比例来
  cvs.width = 200 * devicePixelRatio  
  cvs.height = 200 * devicePixelRatio
 }
 init()

 ctx.beginPath()
 const r = 80 * devicePixelRatio;  // 保证缩放时，图像跟着变大
 ctx.arc(cvs.width / 2 , cvs.height / 2 ,r,0,2*Math.PI)
 ctx.strokeStyle = '#fff'
 ctx.lineWidth = 10 * devicePixelRatio  // 保证缩放时，图像跟着变大
 ctx.stroke()

