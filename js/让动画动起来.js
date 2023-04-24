

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
  this.xSpeed = getRandom(-50,50);  // 每次移动的距离,随机生成偏移的方向
  this.ySpeed = getRandom(-50,50);  // 每次移动的距离,随机生成偏移的方向
  this.lastDrawTime = null;  // 上一次的时间 记录时间 ，用来算运动距离
 }
 draw(){
  // 更新坐标
  if(this.lastDrawTime){ // 如果上次的时间是有值的
   // 如果没有值，代表第一次作画
   // 如何计算坐标？
   // 先算时间差
   const duration = (Date.now() - this.lastDrawTime) / 1000; 
   // duration 时间差 算换成秒 就 除以1000
   const xDis = this.xSpeed * duration,yDis = this.ySpeed * duration;
   // xDis 距离： 每次移动距离 * 每次相差的时间
   // yDis 距离： 每次移动距离 * 每次相差的时间
   let x = this.x + xDis ,
    y = this.y + yDis;
   // x = 需要偏移的距离，也就是下一个位置
   // y = 需要偏移的距离，也就是下一个位置
   if(x > cvs.width - this.r/2){
    // 当坐标到达画布的宽度也就是边界时，
    x = cvs.width - this.r/2; // 就变成cvs.width - this.r/2这个位置
    this.xSpeed = -this.xSpeed  // 运动方向发生改变
   } else if(x<0){
    x = 0; // x = 0 也就是说到了, 当位置到了最左边
    this.xSpeed = -this.xSpeed; // 在改变一下移动方向
   }
   // y的方向也是同理
   if(y > cvs.height - this.r/2){
    y = cvs.height - this.r/2;
    this.ySpeed = -this.ySpeed
   } else if(y<0){
    y = 0;
    this.ySpeed = -this.ySpeed;
   }
   this.x = x;
   this.y = y;
  }
  ctx.beginPath()
  ctx.arc(this.x,this.y,this.r,0,Math.PI*2)
  ctx.fillStyle = '#fff'   // fill：填充，绘图后的背景颜色
  ctx.fill()     // 绘制成填充
  this.lastDrawTime = Date.now()  // 时间戳
 }
}

// 调用随机生成的一个点，并且给他们连线
class Graph{
 constructor(pointNumber = 30,maxDis=300){ 
  // 生成30个Point个构造函数，也就是30个点
  this.points = new Array(pointNumber).fill(0).map(()=> new Point())
  this.maxDis = maxDis   // 最大长度的线，超过这值就透明
 }

 draw(){
  requestAnimationFrame(()=>{   
   /*
   requestAnimationFrame是 JavaScript 中用于在下一次浏览器重绘之前调用函数的方法。
   它可以帮助我们实现更加平滑的动画效果，因为它会在浏览器准备好绘制新的帧时才调用函数，从而避免了在不同的帧之间出现的不一致性。
   相比于使用 setTimeout 或 setInterval 来实现动画效果，requestAnimationFrame 更加高效，因为它会自动适应浏览器的刷新率，从而避免了不必要的计算和绘制
   */ 
   this.draw()
  })
  ctx.clearRect(0,0,cvs.width,cvs.height) // 涂掉某个区域，从0坐标开始，至屏幕的宽高
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