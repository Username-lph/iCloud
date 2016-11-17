var app = angular.module("iCloud", []);
/*controller $scope*/
app.controller("mainCloud", ["$scope", function($scope) {
	var colors = ["purple", "green", "blue", "yellow", "blrown", "red", "orange"];
	$scope.cu = 0;
	$scope.theme=[{color:"purple"},{color:"green"},{color:"blue"},{color:"yellow"},{color:"blrown"},{color:"red"},{color:"orange"}];
	
	//*建立新项目左侧图标*//
	$scope.newimg=[{color:"purple"},{color:"green"},{color:"blue"},{color:"yellow"},{color:"blrown"},{color:"red"},{color:"orange"}];
	/*建立新项目左侧图标   未用*/
	/*本地存储*/
	if(localStorage.iCloud) {
		$scope.lists = JSON.parse(localStorage.iCloud);
		//		console.table($scope.lists);
	} else {
		$scope.lists = [
			//右侧列表
			//			{id:103,name:"购物列表",theme:"blue",
			//				todos:[
			//					{name:"面食",state:1},
			//					{name:"大米",state:0}
			//				]
			//			}
		];
	}
	//	$scope.lists = [];
	
	//	$scope.lists = [{
	//		id: 101,
	//		name: "新建列表1",
	//		theme: "purple"
	//	}, {
	//		id: 102,
	//		name: "新建列表2",
	//		theme: "green"
	//	}];

	/*本地存储函数*/
	$scope.save2local = function() {
			localStorage.iCloud = JSON.stringify($scope.lists);
			$scope.todos = [];
		}
	/*删除*/
	$scope.delete=function(){
		$scope.lists.splice($scope.cu,1);
	}

	/*统计已完成项目*/
	$scope.count=function(){
		var r = 0;
		$scope.lists[$scope.cu].todos.forEach(function(){
			if(state===1){
				r++;
			}
		});
		return r;
	}

	/*清除所有已完成*/
	//	$scope.clear = function() {
	//		var newarr = [];
	//		$scope.lists[$scope.cu].todos.forEach(function() {
	//			if(v.state===0){
	//				newarr.push(v);
	//			}
	//		});
	//		$scope.lists[$scope.cu].todos=newarr;
	//
	//	}

	/*统计已完成项目*/
	function maxId() {
		var max = -Infinity;
		for(var i = 0; i < $scope.lists.length; i++) {
			var v = $scope.lists[i];
			if(v.id > max) {
				max = v.id;
			}
		}
		return(max === -Infinity) ? 100 : max;
	}
	/*添加点击增加列表项*/
	$scope.addList = function() {
		var len = $scope.lists.length;
		var index = len % 7;
		var v = {
			//id:1005,
			id: maxId() + 1,
			name: "新列表" + (len + 1),
			theme: colors[index]
				//			todos:[];
		};
		$scope.lists.push(v);
	}

}]);

/*自定义属性*/
app.directive("myUl", [function() {
	return {
		restrict: "A",
		replace: true,
		transclude: true,
		template: '<ul class="collection-bottom"><div ng-transclude></div></ul> ',
		link: function($scope, el) {
			//事件流，阻止冒泡
			$(el).on("keyup", false);
			//			$(document).on("keyup",":input",false);
			//			$(el).on("keyup", "input", function() {
			//				return false;
			//			});
			$(el).on("click", "li", function() {
				$(el).find("li").removeClass("active");
				$(this).addClass("active");
				$scope.cu = $(this).index();
			});

			$(document).on("keyup", function(e) {
				if(e.keyCode === 8) {
					var index = $(".active").index();
					if(index === -1) {
						return;
					}
					$scope.$apply(function() {
						$scope.lists.splice(index, 1);
						$scope.save2local();
					});
				}
			});
		}
	}
}]);

/*xk*/
$(".right-xk").hide();
app.directive("ngXk", function() {
	return {
		restrict: "A",
		transclude: true,
		replace: true,
		template: '<div class="right-button"><div ng-transclude></div></div>',
		link: function($scope, el) {
			$(el).on("click", "label", function() {
				$(".right-xk").toggle();
				return false;
			});
			$(".right-button").on("click", false);
			$(document).on("click", function() {
				$(".right-xk").hide();
			});
		}
	}
});
/*边框及背景*/
app.directive("completeList",function(){
	return {
		restrict:"A",
		transclude:true,
		replace:true,
		template: '<div class="complete-list"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(".com-list-inner").on("click",function(){
				$(this).addClass(".active");
				return false;
			});
		}
	}
});

/*删除	取消     完成*/
app.directive("xkButton",function(){
	return {
		restrict:"A",
		transclude:true,
		replace:true,
		template: '<div class="xk-button"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on("click",".cancel",function(){
				$(".right-xk").fadeOut();
				return false;
			});
			$(el).on("click",".finish",function(){
				$(".right-xk").fadeOut();
				return false;
			});
		}
	}
});

/*完成事项*/
$(".complete-list").hide();
$(".complete .clear").hide();
app.directive("finish",function(){
	return {
		restrict:"A",
		transclude:true,
		replace:true,
		template:'<div class="finish"><div ng-transclude></div></div>',
		link:function($scope,el){
//			console.log($("el .complete"));
			$(".btn").on("click",function(){
				$(this).toggleClass("active");
//				console.log($("complete-list"));
				$(".complete-list").fadeToggle();
				$(".complete .clear").fadeToggle();
				return false;
			});
		}
	}
});

/*建立新项目左侧图标*/
$("#new").hide();
app.directive("project",function(){
	return {
		restrict:"A",
		transclude:true,
		replace:true,
		template:'<div class="project"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on("click",".pro-title",function(){
				$("#new").fadeToggle();
				return false;
			});
//			$(document).on('click',function(){
//				$("#new").fadeOut();
//				return false;
//			});
		}
	}
});

