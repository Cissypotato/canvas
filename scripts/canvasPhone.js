var canvas=document.getElementById('canvas'); 
var context=canvas.getContext('2d');
var circleRadius=2

if(document.body.ontouchstart!==undefined){
    listenToTouch(canvas);
    autoSetCanvasSize(canvas);
    context.fillStyle="#000"
}else{
    listenToMouse(canvas);
    autoSetCanvasSize(canvas);
    context.fillStyle="#000"
}
// setFillStyle()



var actions=document.getElementById('actions')
var eraser=document.getElementById('eraser');
var brush=document.getElementById('brush');
var eraserEnabled=false;
eraser.onclick=function(){
    eraserEnabled=true;
    eraser.classList.add("active")
    brush.classList.remove("active")
    removeColorsActive()

}
brush.onclick=function(){
    eraserEnabled=false;
    brush.classList.add("active");
    eraser.classList.remove("active")
    colors[0].classList.add('active')
}

//画笔颜色的调整
var colors=document.querySelectorAll('.colors>li')
for(var i=0;i<colors.length;i++){
    colors[i].onclick=function(e){
        var color=e.currentTarget.getAttribute('data-color')
        context.fillStyle=color
        context.strokeStyle=color
        e.currentTarget.classList.add('active')
        removeSiblingsClass(e.currentTarget)
    }
}

// var black=document.getElementById('black')
// var red=document.getElementById('red')
// var green=document.getElementById('green')
// var blue=document.getElementById('blue')
// black.onclick=function(){
//     context.fillstyle="black"
//     context.strokeStyle='black'
//     black.classList.add('active')
//     red.classList.remove('active')
//     green.classList.remove('active')
//     blue.classList.remove('active')
// }
// red.onclick=function(){
//     context.fillstyle="red"
//     context.strokeStyle='red'
//     red.classList.add('active')
//     green.classList.remove('active')
//     blue.classList.remove('active')
//     black.classList.remove('active')
// }
// green.onclick=function(){
//     context.fillstyle="green"
//     context.strokeStyle='green'
//     red.classList.remove('active')
//     green.classList.add('active')
//     blue.classList.remove('active')
//     black.classList.remove('active')
// }
// blue.onclick=function(){
//     context.fillstyle="blue"
//     context.strokeStyle='blue'
//     red.classList.remove('active')
//     green.classList.remove('active')
//     blue.classList.add('active')
//     black.classList.remove('active')
// }


var lineWidth=5;
var bold=document.getElementById('bold');
var thin=document.getElementById('thin');
thin.onclick=function(){
    lineWidth=5
    circleRadius=2
    thin.classList.add('active')
    bold.classList.remove('active')
}
bold.onclick=function(){
    lineWidth=8
    circleRadius=4
    thin.classList.remove('active')
    bold.classList.add('active')
    
}


var clear=document.getElementById('clear')
clear.onclick=function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}

var download=document.getElementById('download')
download.onclick=function(){
    var url=canvas.toDataURL("image/png")
    var a=document.createElement('a')
    var actions=document.getElementById('actions')
    actions.appendChild(a);
    a.href=url
    a.target='_blank'
    a.download='我的创作'
    a.click();
    
}
/*******监听触屏事件 */
function listenToTouch(canvas){
    var using=false;
    var lastPoint={x:undefined,y:undefined}
    canvas.ontouchstart=function(aaa){
        using=true;
        var x=aaa.touches[0].clientX;
        var y=aaa.touches[0].clientY;
        if(eraserEnabled){
            
            context.clearRect(x-5,y-5,10,10)
            
        }else{
            lastPoint={'x':x,'y':y}
            
        }
    
    }
    canvas.ontouchmove=function(aaa){
        var x=aaa.touches[0].clientX;
        var y=aaa.touches[0].clientY;
        if(!using){return}
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10) 
        }else{
            var newPoint={'x':x,'y':y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint['y']);
            lastPoint=newPoint
        }            
           
        }
    
    
    canvas.onmouseup =function(aaa){
        using=false;

    }
}

/********监听鼠标事件 */
function listenToMouse(canvas){
    var using=false;
    var lastPoint={x:undefined,y:undefined}
    canvas.onmousedown=function(aaa){
        using=true;
        var x=aaa.clientX;
        var y=aaa.clientY;
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }else{
            lastPoint={'x':x,'y':y}
            drawCircle(x,y,circleRadius)
        }
    }
    canvas.onmousemove=function(aaa){
        var x=aaa.clientX;
        var y=aaa.clientY;
        if(!using){return}
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10) 
        }else{
            var newPoint={'x':x,'y':y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint['y']);
            drawCircle(x,y,circleRadius)
           
        }
        lastPoint=newPoint
    }
    
    
    canvas.onmouseup =function(aaa){
        using=false;

    }

}




//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.lineWidth=lineWidth;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2)
    context.stroke();
    context.closePath();
}

//画圆
function drawCircle(x,y,radius){
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}
// /******/canvas size
function autoSetCanvasSize(canvas){
    setCanvasSize()
    //用户改变窗口大小时
    window.onresize=function(){
        setCanvasSize()
    }
    //定义canvas的宽高和屏幕一样大
    function setCanvasSize(){
        var pageWidth=document.documentElement.clientWidth;
        var pageHeight=document.documentElement.clientHeight;
        canvas.width=pageWidth;
        canvas.height=pageHeight;
        context.fillStyle="#fff"
        context.fillRect(0,0,pageWidth,pageHeight)
    }
}
//由于原生js没有获取所有兄弟元素的api，所以写了个移除所有兄弟元素一个class的函数
function removeSiblingsClass(ele){
    var children = ele.parentNode.children;
    var siblings= [].filter.call(children, function(child) {
      return child !== ele;
    });
    for(var i=0;i<siblings.length;i++){
            siblings[i].classList.remove('active')
    }
}
//移除所有颜色的active
function removeColorsActive(){
    for(var i=0;i<colors.length;i++){
        colors[i].classList.remove('active')
}
}
