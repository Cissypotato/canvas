var canvas=document.getElementById('canvas'); 
var context=canvas.getContext('2d');


if(document.body.ontouchstart!==undefined){
    listenToTouch(canvas);
    autoSetCanvasSize(canvas);
}else{
    listenToMouse(canvas);
    autoSetCanvasSize(canvas);
}




var actions=document.getElementById('actions')
var eraser=document.getElementById('eraser');
var brush=document.getElementById('brush');
var eraserEnabled=false;
eraser.onclick=function(){
    eraserEnabled=true;
   eraser.classList.add("active")
   brush.classList.remove("active")
}
brush.onclick=function(){
    eraserEnabled=false;
    brush.classList.add("active");
    eraser.classList.remove("active")
}

var black=document.getElementById('black')
var red=document.getElementById('red')
var green=document.getElementById('green')
var blue=document.getElementById('blue')
black.onclick=function(){
    context.fillstyle="black"
    context.strokeStyle='black'
    balck.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick=function(){
    context.fillstyle="red"
    context.strokeStyle='red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
green.onclick=function(){
    context.fillstyle="green"
    context.strokeStyle='green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}
blue.onclick=function(){
    context.fillstyle="blue"
    context.strokeStyle='blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    black.classList.remove('active')
}


var lineWidth=5;
var bold=document.getElementById('bold');
var thin=document.getElementById('thin');
thin.onclick=function(){
    lineWidth=5
    console.log('b')
}
bold.onclick=function(){
    lineWidth=10
    console.log('a')
    
}


var clear=document.getElementById('clear')
clear.onclick=function(){
    context.clearRect(0,0,canvas.width,canvas.height)
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
        }
           
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint['y']);
            lastPoint=newPoint
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
        }
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint['y']);
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
    }
}