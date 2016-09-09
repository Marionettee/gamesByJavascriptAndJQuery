$(function(){
	var snakeBody = [];		//储存蛇的身体
	var dir;				//存储方向
	var snakeTime;			//存储计时器	
	var last;				//数组中的最后一个元素
	var redFood;
//				创建表格
	function creatTable(){
		$("table").empty();
		snakeBody = [];
		clearInterval(snakeTime);
		
		for(var i=0;i<20;i++){
			var $tr = $("<tr>");
			$tr.appendTo("table");
			for(var j=0;j<35;j++){
				var $td = $("<td class='color"+getColor(3)+"'>");
				$td.attr("id",i+"-"+j);
				$td.appendTo($tr);
			}
		}
		creatSnake();	//创建表格之后产生蛇头
		creatFood();	//创建表格之后产生食物
		dir = 39;		//初始方向为39-右
		$(window).keydown(attachEvents);	//键盘按下事件
		walk();			//蛇行走的方法
	}
	
//				蛇运动
	function walk(){
		snakeTime = setInterval(step,300);		//每隔500毫秒移动一次
	}
	
//				蛇行走的方向
	function step(){
//					获取当前的目标点
		var headX = snakeBody[0].split("-")[0];
		var headY = snakeBody[0].split("-")[1];
//		console.log(headX+"   "+headY);
//					获取下一步的目标点
		switch(dir){
			case 37:headY--;break;
			case 38:headX--;break;
			case 39:headY++;break;
			case 40:headX++;break;
		}

//					让蛇动起来
		var newHead = headX+"-"+headY;
		$("#"+newHead).addClass("snake");
		snakeBody.unshift(newHead);
		last = snakeBody.pop();
		$("#"+last).removeClass("snake");
					
//					判断吃到食物
		if(snakeBody[0]==redFood){
			$("#"+redFood).removeClass("food").addClass("snake");
			$("#"+last).addClass("snake");
			snakeBody.push(last);
			creatFood();
		}
					
//					碰到墙或碰到自己弹出游戏结束
		if(headX>19||headX<0||headY>34||headY<0){
			window.clearInterval(snakeTime);
			if(confirm("恭喜您，蛇挂了。要重新开始吗？")){
				creatTable();
			};
		}
	}
				
//				产生键值
	function attachEvents(e){
		dir = e.keyCode>36&&e.keyCode<41&&Math.abs(e.keyCode-dir)!=2 ? e.keyCode : dir;
		console.log(dir);
	}
				
//				格子颜色随机数
	function getColor(x){
		return Math.floor(Math.random()*x)
	}
				
//				产生ID随机数
	function getId(){
		var y = Math.floor(Math.random()*35);
		var x = Math.floor(Math.random()*20);
		return x+'-'+y;
	}
				
//				产生蛇头
	function creatSnake(){
		var head = getId();
		$("#"+head).addClass("snake");
		snakeBody.unshift(head);    //把蛇头放进数组的第一位
	}
				
//				产生食物
	function creatFood(){
		var food = getId();
		if(food==snakeBody[0]){
			creatFood();
		}
		$("#"+food).addClass("food");
		redFood = food;
	}

//				点击按钮初始化界面
	$("button").bind("click",creatTable);
})