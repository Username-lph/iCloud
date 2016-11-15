$(function() {
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	var sep = 40;
	var sR = 4;
	var bR = 15;
	//	var arr = [];
	var obj = {};
	/*获取音乐*/
	var $audio = $("#audio");
	var audio = $audio.get(0);
	/*秒表*/
	var canvasZ = $("#canvas-z").get(0);
	var context = canvasZ.getContext("2d");

	var canvasY = $("#canvas-y").get(0);
	var contex = canvasY.getContext("2d");

	var retract = $(".retract");
	var pause = $(".pause");
	var end = $(".end");

	/*开始界面场景*/
	var Star = $("#Star");
	var gk = $("#gk");
	var star = $(".star");
	/*下棋场景*/
	var Canvas = $("#Canvas");
	var back = $("#back");
	/*输赢*/
	var info = $("#info");
	var infotext = $(".text");
	var again = $(".again");
	var cancle = $(".cancle");
	/*模式变量获取*/
	var rj = $("#gk li").get(0);
	var sr = $("#gk li").get(1);
	var wl = $("#gk li").get(2);
	var ph = $("#gk li").get(3);
	var cj = $("#gk li").get(4);
	var xk = $("#gk li a").get(5);

	var now = 0;
	var next = 0;
	var flag = true;
	/*人机对战*/
	var computerAI = false;
	var gameState = "pause";
	var kongbai = {};

	$("#gk li").eq(0).addClass("active");
	$("#gk").on("click", "li", function() {
		$(this).addClass("active").siblings().removeClass("active");
	});

	/*选项卡*/
	var Xk = $("#Xk");
	$("#gk .xxk").on("click", function() {
		Xk.fadeIn().addClass("active");
	});

	/*成就*/
	var Cj = $("#Cj");
	$("#gk .cj").on("click", function() {
		Cj.fadeIn().addClass("active");
	});

	/*五个小圆*/
	function Circle(x, y, r) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(lam(x), lam(y), r, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	/*lam函数便于运算	给定一个坐标点算出准备的坐标*/
	function lam(x) {
		return(x + 0.5) * sep + 0.5;
	}

	/*drawQipan*/
	function drawQipan() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.beginPath();
		for(var i = 0; i < 15; i++) {
			/*横轴*/
			ctx.moveTo(20.5, 20.5 + i * sep);
			ctx.lineTo(580.5, 20.5 + i * sep);
			/*纵轴*/
			ctx.moveTo(20.5 + i * sep, 20.5);
			ctx.lineTo(20.5 + i * sep, 580.5);

		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		/*调用Circle画出五个小圆*/
		Circle(7, 7, sR);
		Circle(3, 3, sR);
		Circle(11, 3, sR);
		Circle(3, 11, sR);
		Circle(11, 11, sR);

	}

	drawQipan();

	////////棋子
	function Chessmen(x, y, color) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(lam(x), lam(y));
		ctx.arc(0, 0, bR, 0, Math.PI * 2);
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 8;
		ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
		var Color = ctx.createRadialGradient(0, 0, 10, 0, 0, 1);
		if(color === "#000") {
			Color.addColorStop(0, "#0a0a0a");
			//Color.addColorStop(0, "#313236");
			Color.addColorStop(1, "#636363");
		} else {
			Color.addColorStop(0, "#e1e1e1");
			//Color.addColorStop(0.4, "#D8DBE0");
			Color.addColorStop(1, "#f1f1f1");
		}
		ctx.closePath();
		ctx.fillStyle = Color;
		ctx.fill();
		ctx.restore();
		//数组形式，占用内存少，代码量多
		/*arr.push({x: x,y: y,color: Color});
		console.table(arr);*/
		//对象形式，占用内在多，代码量少
		obj[connect(x, y)] = color;
		gameState = "play";
		//每下一个棋子就删除一个空白的位置
		delete kongbai[connect(x, y)];
	}

	//数组形式
	//	function exist(x, y) {
	//		var flag = false;
	//		$.each(arr, function(i, v) {
	//			if(v.x === x && v.y === y) {
	//				flag = true;
	//			}
	//		});
	//		return flag;
	//	}

	/*秒表*/
	//////////
	var deg = 0;

	function Second1() {
		context.save();

		context.translate(100, 120);
		context.beginPath();
		context.stroke();
		context.closePath();
		//		var now =new Date();
		//		var s = now.getMilliseconds();
		context.arc(0, 0, 5, 0, Math.PI * 2);
		context.rotate(Math.PI / 180 * 6 * deg);
		context.beginPath();
		context.moveTo(0, 5);
		context.lineTo(0, 20);
		context.moveTo(0, -5);
		context.lineTo(0, -60);
		context.closePath();
		context.stroke();
		context.fill();

		deg += 1;
		if(deg >= 360) {
			deg = 0;
		}
		context.restore();

	}

	Second1();

	function renderZ() {
		context.clearRect(0, 0, 200, 200);
		Second1();
	}

	var t1;

	function Second2() {
		contex.save();

		contex.translate(100, 120);
		contex.beginPath();
		contex.stroke();
		contex.closePath();
		//		var now=new Date();
		contex.arc(0, 0, 5, 0, Math.PI * 2);
		//		var s = now.getMilliseconds();
		//		console.log(s);
		contex.rotate(Math.PI / 180 * 6 * deg);
		contex.beginPath();
		contex.moveTo(0, 5);
		contex.lineTo(0, 20);
		contex.moveTo(0, -5);
		contex.lineTo(0, -60);
		contex.closePath();
		contex.stroke();
		contex.fill();

		deg += 1;
		if(deg >= 360) {
			deg = 0;
		}
		contex.restore();
	}
	Second2();

	function renderY() {
		contex.clearRect(0, 0, 200, 200);
		Second2();
	}

	var t2;

	/*连接键值对connect 函数*/
	function connect(x, y) {
		return x + '_' + y;
	}

	/*判断输赢*/
	function pd(x, y, color) {
		//var row,lie,zx,yx;
		var i;
		var row = 1;
		i = 1;
		while(obj[connect(x + i, y)] === color) {
			row++;
			i++;
		}
		i = 1;
		while(obj[connect(x - i, y)] === color) {
			row++;
			i++;
		}
		//		/*列*/
		var lie = 1;
		i = 1;
		while(obj[connect(x, y - i)] === color) {
			lie++;
			i++;
		}
		i = 1;
		while(obj[connect(x, y + i)] === color) {
			lie++;
			i++;
		}
		//		/*左斜*/
		var zx = 1;
		i = 1;
		while(obj[connect(x - i, y - i)] === color) {
			zx++;
			i++;
		}
		i = 1;
		while(obj[connect(x + i, y + i)] === color) {
			zx++;
			i++;
		}
		//		/*右斜*/
		var yx = 1;
		i = 1;
		while(obj[connect(x - i, y + i)] === color) {
			yx++;
			i++;
		}
		i = 1;
		while(obj[connect(x + i, y - i)] === color) {
			yx++;
			i++;
		}
		return Math.max(row, lie, zx, yx);
	}

	/*chessManual 画棋谱*/
	chessManual = function() {
		//		$("#check").html("");
		ctx.save();
		ctx.font = "16px/0    微软雅黑";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		var i = 1;
		for(var k in obj) {
			var arr = k.split('_');
			if(obj[k] === "#000") {
				ctx.fillStyle = "#fff";
			} else {
				ctx.fillStyle = "#000";
			}
			ctx.fillText(i++, lam(parseInt(arr[0])), lam(parseInt(arr[1])));
		}
		ctx.restore();
		$("<img>").attr("src", canvas.toDataURL()).appendTo("#check");
		$("<a>").attr("href", canvas.toDataURL()).attr("download", "qipu.png").appendTo("#check");

	}
	for(var i = 0; i < 15; i++) {
		for(var j = 0; j < 15; j++) {
			kongbai[connect(i, j)] = true;
		}
	}

	function int() {
		var max = -Infinity;
		var max2 = -Infinity;
		var pos = {};
		var pos2 = {};
		for(var j in kongbai) {
			var x = parseInt(j.split("_")[0])
			var y = parseInt(j.split("_")[1])
			var a = pd(x, y, "#000");
			if(a > max) {
				max = a;
				pos = {
					x: x,
					y: y
				};
			}
		}
		for(var j in kongbai) {
			var x = parseInt(j.split("_")[0])
			var y = parseInt(j.split("_")[1])
			var a = pd(x, y, "#fff");
			if(a > max2) {
				max2 = a;
				pos2 = {
					x: x,
					y: y
				};
			}
		}
		if(max > max2) {
			return pos;
		} else {
			return pos2;
		}
		do {
			var x = Math.floor(Math.random() * 15);
			var y = Math.floor(Math.random() * 15);
		}
		while (obj[connect(x, y)]);
		return {
			x: x,
			y: y
		};
	}
	/*查看棋谱*/
	var check = $("#check");
	var btn = $(".btn");
	var close = $("#close");
	//	$("#check").on("click", chessManual);

	$(".btn").on("click", function() {
		check.addClass("active");
		chessManual();
	});
	/*查看棋谱中的关闭按钮*/
	close.on("click", function() {
		check.removeClass("active");
		//		redrawchess();
		drawQipan();
		for(var j in obj) {
			var x = parseInt(j.split('_')[0]);
			var y = parseInt(j.split('_')[1]);
			Chessmen(x, y, obj[j]);
		}
	});

	/*点击关闭按钮然后重新绘出原来下过的棋子*/
	function redrawchess() {
		obj = {};
		canvas.width = 600;
		canvas.height = 600;
		drawQipan();
		fun();
		gameState = "pause";
	}

	/*黑白棋子互相切换*/
	var Switch = true;

	function fun() {
		$("#canvas").on("click", function(e) {
			var x = Math.floor(e.offsetX / sep);
			var y = Math.floor(e.offsetY / sep);
			//console.log(x, y);
			//数组形式
			//if(exist(x,y)){
			//	  return;
			//}
			//对象形式
			if(obj[connect(x, y)]) {
				return;
			}

			/*只要一点击就让它取反*/
			if(computerAI) {
				Chessmen(x, y, "#000");
				/*判断输赢调用pd()*/
				if(pd(x, y, "#000") >= 5) {
					$("#canvas").off("click");
					info.find(".text").html("黑棋赢!").end().addClass("active");
				}
				var f = int();
				Chessmen(f.x, f.y, "#fff");
				if(pd(f.x, f.y, "#fff") >= 5) {
					$("#canvas").off("click");
					$("#info").find(".text").html("白棋赢!").end().addClass("active");
				}
				return false;
			}
			if(Switch) {
				Chessmen(x, y, "#000");
				if(pd(x, y, "#000") >= 5) {
					$("#canvas").off("click");
					clearInterval(t1);
					clearInterval(t2);
					$("#info").find(".text").html("黑棋赢!").end().addClass("active");
				}
				deg = 0;
				Second1();
				clearInterval(t1);
				t2 = setInterval(renderY, 1000);
			} else {
				Chessmen(x, y, "#fff");
				if(pd(x, y, "#fff") >= 5) {
					$("#canvas").off("click");
					clearInterval(t1);
					clearInterval(t2);
					$("#info").find(".text").html("白棋赢!").end().addClass("active");
				}
				deg = 0;
				Second1();
				clearInterval(t2);
				t1 = setInterval(renderZ, 1000);
			}
			Switch = !Switch;
			audio.play();
			//			console.log(audio);
			//			return false;
		});
		audio.play();
	}
	fun();

	//人机对战
	$("#computerAI").on("click", function() {
		if(gameState === "play") {
			return;
		}
		$(this).addClass("active");
		computerAI = true;
	});
	//双人模式
	$("#person").on("click", function() {
		if(gameState === "play") {
			return;
		}
		$("#computerAI").removeClass("active");
		$(this).addClass("active");
		computerAI = false;
	});

	/*悔棋  议和   认输*/
	$(".restart").on("click", function() {
		obj = {};
		ctx.clearRect(0,0,600,600);
		drawQipan();
		fun();
		gameState = "pause";
	});

	//	var checked=true;
	var input = $(".huiqi input");
	var input1 = $(".yihe input");
	var input2 = $(".renshu input");

	function huiqi() {
		if(input === true) {
			$(".huiqi").removeClass("active");
			$(".yihe").removeClass("active");
			$(".renshu").removeClass("active");
			for(var j in obj) {
				var x = parseInt(j.split('_')[0]);
				var y = parseInt(j.split('_')[1]);
				Chessmen(x, y, obj[j]);
			}
			fun();
			gameState = "play";
		} else {
			$(".huiqi").removeClass("active");
			$(".yihe").removeClass("active");
			$(".renshu").removeClass("active");
			fun();
			obj = {};
			ctx.clearRect(0, 0, 600, 600);
			drawQipan();
			gameState = "pause";
		}
	}
	retract.on("click", function() {
		$(".huiqi").addClass("active");
		$(".huiqi").on("click", "input", function() {
			huiqi();
		});
		deg = 0;
		clearInterval(t2);
		clearInterval(t1);
	});
	pause.on("click", function() {
		$(".yihe").addClass("active");
		$(".yihe").on("click", "input", function() {
			huiqi();
		});
		deg = 0;
		clearInterval(t2);
		clearInterval(t1);
	});
	end.on("click", function() {
		$(".renshu").addClass("active");
		$(".renshu").on("click", "input", function() {
			huiqi();
		});
		deg = 0;
		clearInterval(t2);
		clearInterval(t1);
	});

	//////////////////

	/*点击开始按钮进入下棋场景并开始计时*/
	star.on("click", "a", function() {
		ctx.clearRect(0, 0, 600, 600);
		drawQipan();
		fun();
		obj={};
		$(this).fadeOut();
		t1 = setInterval(renderZ, 1000);
		Star.fadeOut();
		Canvas.fadeIn();
		back.fadeIn();
		$("#gk li a").removeClass("active");
		Xk.fadeOut();
		Cj.fadeOut();
	});

	/*点击退出即退出下棋场景到开始界面场景选择模式*/
	back.on("click", function() {
		$(this).fadeOut();
		Canvas.fadeOut();
		deg = 0;
		clearInterval(t2);
		clearInterval(t1);
		Star.fadeIn();
		$(".star a").fadeIn();
	});

	/*点击再来一局*/
	again.on("click", function() {
		info.removeClass("active");
		$("#canvas").on("click", fun);
		Switch = true;
		obj = {};
		gameState = "pause";
		canvas.width = 600;
		canvas.height = 600;
		drawQipan();
		gameState = "pause";
	});

	/*点击退出游戏回到主页面*/
	cancle.on("click", function() {
		info.removeClass("active");
		Star.fadeIn();
		star.fadeIn();
		Canvas.fadeOut();
	});
});