"use strict";

class ShopingList {
	constructor() {
		this.list = [];
	}
	
	getList() {
		return this.list;
	}
	
	add(item){
		this.list.push({fooditem: String(item), bought: false})
	}
	
	set(i, bought) {
		this.list[i].bought = bought;
	}
	
	delItem(i) {
		this.list.splice(i,1);
	}
	
	delList(){
		this.list = [];
	}
	
	clean(){
		let cleanedList = [];
		this.list.forEach (el => {
			if (!el.bought) {
				cleanedList.push(el);
			}
		});
		this.list = cleanedList;
	}
	
	
	
	testing() {
		this.list.forEach(
		(el,i) => console.log(i + ": " + el.fooditem + " " + el.bought) 
		);
		console.log("..............");
	}
	
}


let testList = new ShopingList();

testList.add("Mehl");
testList.add("Vodka");
testList.add("Aepfel");
testList.set(1,true);
testList.testing();
testList.clean();

testList.testing();
testList.delItem(0);

testList.testing();

