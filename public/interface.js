

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

 


/*
let myList =  new ShopingList();

const refreshView = () => {
	
	let content = "";
	myList.getList().forEach((el, i) => {
		
		let checked = "";
		if(el.bought) {
            checked = "checked";
                     }
		content += '<div id="foodItem"><input type="checkbox" id="check'+[i]+'" '+checked+'><span class="'+checked+'" >' + el.fooditem + '</span> <button class="deleteItem">X</button></div>';
	} );
	
	document.querySelector("#foodItems").innerHTML = content;

    myList.getList().forEach( (el, i) => {
        document.querySelector("#check" + [i]).addEventListener("click", () => {
            myList.set(i, document.querySelectorAll("#foodItems input")[i].checked);
			document.querySelector("#check" + [i] + "+ span").classList.toggle("checked");
					
            myList.testing();
            
        });
		
		
    });
    
    
    let delButtons = Array.from(document.querySelectorAll(".deleteItem"));
    delButtons.forEach((el, i) => {
        el.addEventListener("click", () => {
            myList.delItem(i);
            refreshView();
            myList.testing();
        });
    });
	
	
};

    
document.querySelector("#add").addEventListener("click", () => {
    if (document.querySelector("#newItem").value.trim() !== "") {
        myList.add(document.querySelector("#newItem").value);
        refreshView();
        }
    document.querySelector("#newItem").value = "";
});
    
    
   
    
    
  
document.querySelector("#clean").addEventListener("click", () => {
    myList.clean();
    refreshView();
});

document.querySelector("#delete").addEventListener("click", () => {
   if (confirm("Sind Sie sicher?")) {
    myList.delList();
    refreshView();
       };
});  
   
  // Trigger the button element with a Enter-click
let input = document.getElementById("newItem");
input.addEventListener("keyup", (e) => {
   e.preventDefault();
   if (e.keyCode === 13) {
   document.getElementById("add").click();
  }
}); 
   

 */
    
/*$scope.myList.add($scope.newItem);
		$scope.newItem = "";
		$scope.myList.testing();	*/
	
		
