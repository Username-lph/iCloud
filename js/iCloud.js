var app = angular.module("iCloud", []);
/*controller $scope*/
app.controller("mainCloud", ["$scope", function($scope) {
	var colors = ["purple", "green", "blue", "yellow", "blrown", "red", "orange"];
	$scope.cu = 0;
	/*本地存储*/
	if(localStorage.iCloud) {
		$scope.lists = JSON.parse(localStorage.iCloud);
	} else {
		$scope.lists = [];
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
	$scope.save2local=function() {
		localStorage.iCloud = JSON.stringify($scope.lists);
	}

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

	$scope.addList = function() {
		var len = $scope.lists.length;
		var index = len % 7;
		var v = {
			//id:1005,
			id: maxId() + 1,
			name: "新列表" + (len + 1),
			theme: colors[index]
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
			$(el).on("keyup",false);
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
app.directive("ngXk",function(){
	return{
		restrict:"A",
		transclude:true,
		replace:true,
		template: '<div class="right-button"><div ng-transclude></div></div>',
		link:function($scope,el){
			$(el).on("click","label",function(){
				$(".right-xk").toggle();
			});
		}
	}
});
