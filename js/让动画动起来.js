

// 待定

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
 

function getRandom(min,max) {
 // 随机生成整数
 return Math.floor(Math.random() * (max +1 - min) + min)
}

// 随机生成一个点
class Point{
 constructor(){
  this.r = 4;
  this.x = getRandom(0,cvs.width - this.r/2); 
  //x的坐标最大出现的位置在画布的宽度内
  this.y = getRandom(0,cvs.height - this.r/2);
  //y的坐标最大出现的位置在画布的高度内
 }
 draw(){
  ctx.beginPath()
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
  ctx.fillStyle = '#fff'   // fill：填充，绘图后的背景颜色
  ctx.fill()     // 绘制成填充
 }
}

// 调用随机生成的一个点，并且给他们连线
class Graph{
 constructor(pointNumber = 30,maxDis=500){ 
  // 生成30个Point个构造函数，也就是30个点
  this.points = new Array(pointNumber).fill(0).map(()=> new Point())
  this.maxDis = maxDis   // 最大长度的线，超过这值就透明
 }

 draw(){
  for (let i = 0; i < this.points.length; i++) {
   const p1 = this.points[i];  // 循环，生成一个新的构造函数，在循环内
   p1.draw()  // 生成pointNumber：30个点，并且在生成后
   for (let j = i+1; j < this.points.length; j++) {
    const p2 = this.points[j]
    const d = Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
    // d = 两点之间的距离
    // 2**2 = 2的平方
    // Math.sqrt 返回平方根的值  
    // 25 = 5*5 ， 25的平方根是5 
    // 两点的直线距离等于三角形的第三条边等于x的平方加y的平方的平方根
    // 先得到两点的长和高然后在求第三边
    if(d > this.maxDis) {
     continue;
    }
    ctx.beginPath()
    ctx.moveTo(p1.x,p1.y)
    ctx.lineTo(p2.x,p2.y)
    ctx.closePath()
    ctx.strokeStyle = `rgba(200,200,200,${1-d/this.maxDis})`
    ctx.stroke()
   }
  }
 }
}

const g = new Graph()
g.draw()