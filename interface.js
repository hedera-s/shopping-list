window.onload = () => { 

"use strict";

let myList =  new ShopingList();

const refreshView = () => {
	
	let content = "";
	myList.getList().forEach((el, i) => {
		let checked = "";
		if(el.bought) {checked = "checked";}
		content += '<div class="foodItem"><input type="checkbox"><span>${el.fooditem}</span> <button class="deleteItem">X</button></div>';
	} );
	
	document.querySelector("#foodItems").innerHTML = content;
	
}

	
		document.querySelector("#test").innerHTML = 243;

		}