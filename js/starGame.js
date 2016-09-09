var x_left = 0;
var x_right = 0;
var y_top = 0;
var y_bottom = 0;


// 设置星星的最大宽度
var img_width_max = 80;	
// 设置星星的最小宽度	
var img_width_min = 10;		

function init(){
	// 设置背景色
	document.body.setAttribute("style","background:url(img/a.jpg);-webkit-background-size: 100%;-moz-background-size: 100%;background-size: 100%;background-position:0px -100px");
	// 获取星星在可视区域的最大宽度和高度
	x_right = window.innerWidth-img_width_max;
	y_bottom = window.innerHeight-img_width_max;
	// 定时器
	setInterval("start()", 1000);
}

// 随机输出星星
function start(){
	// 创建img节点
	var img = document.createElement("img");
	// 设置src属性，图片路径
		img.setAttribute("src", "img/star.png");
	// img追加到body中
	document.body.appendChild(img);
	// 星星的随机宽度
	var width = getRandom(img_width_max,img_width_min);	
	// alert(width);
	// 随机获取星星的X与Y坐标
	var x = getRandom(x_left,x_right);
	var y = getRandom(y_top,y_bottom);
	// 为星星设置样式
	var str = "position:absolute;width:"+width+"px;top:"+y+"px;left:"+x+"px";
		img.setAttribute( "style", str);
	img.setAttribute("onclick","removeImg(this)");
}

function getRandom(max1,min1){
	return Math.floor(Math.random()*(max1-min1)+min1);
}

// Math.floor(Math.random()*70+10);

function removeImg(o){
	document.body.removeChild(o);
}

