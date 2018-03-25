var canvas=document.getElementById('canvas'); 
var context=canvas.getContext('2d');



autoSetCanvasSize(canvas);
listenToMouse(canvas);

var actions=document.getElementById('actions')
var eraser=document.getElementById('eraser');
var brush=document.getElementById('brush');
var eraserEnabled=false;
eraser.onclick=function(){
    eraserEnabled=true;
    actions.className="actions x"
}
brush.onclick=function(){
    eraserEnabled=false;
    actions.className="actions"
}



function listenToMouse(canvas){
    var using=false;
    var lastPoint={x:undefined,y:undefined}
    canvas.onmousedown=function(aaa){
        using=true;
        var x=aaa.clientX;
        var y=aaa.clientY;
        // var divA=document.createElement("div");
        // divA.style="width:6px;height:6px;background:black;border-radius:50%;position:absolute;left:"+(x-3)+"px;"
        // +"top:"+(y-3)+"px;";
        // canvas.appendChild(divA);//div画圆
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }else{
            lastPoint={'x':x,'y':y}
        }
        
        // drawCircle(x,y,10)//圆
    
    
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
           
           
            // var divA=document.createElement("div");
            // divA.style="width:6px;height:6px;background:black;border-radius:50%;position:absolute;left:"+(x-3)+"px;"
            // +"top:"+(y-3)+"px;";
            // canvas.appendChild(divA);//div画圆
            // drawCircle(x,y,10)//圆
            drawLine(lastPoint.x,lastPoint.y,newPoint['x'],newPoint['y']);
            lastPoint=newPoint
        }
    
    
    canvas.onmouseup =function(aaa){
        using=false;

    }

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

//画线
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.strokeStyle='black';
    context.lineWidth=5;
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