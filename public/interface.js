

"use strict";
angular.module("ShopingListApp", []).controller("ctrl", ($scope, $http) => {
	$scope.userName = userName;
	
	
	let refresh = () => {
		$http.get("/items").then(
			data => $scope.myList = data.data.list
		);
	};
	
	$scope.add = () => {
		$http.post("/items", $scope.newItem).then(
			data => $scope.myList = data.data.list			
		).then(()=> $scope.newItem.text = "");
	};
	
	$scope.delItem = (index) => {
		$http.post("/delItem", JSON.stringify ({index: index }) ).then(
			data => $scope.myList = data.data.list,
			data => console.log ( 'Fehler: '+ data )
		);
		
	};
	
	$scope.update = i => {
		$http.put("/items/" + i, $scope.myList[i]).then(
			data => console.log(data),
			data => console.log ("fehler " + data)
		);
		
	};
	
	
	
	$scope.clean = () => {
		$http.delete("/items");
		refresh();
	};
	
	refresh();
	
	
	
		
});

 

