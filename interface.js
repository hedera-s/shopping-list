window.onload = () => { 

"use strict";

let myList =  new ShopingList();

const refreshView = () => {
	
	let content = "";
	myList.getList().forEach((el, i) => {
		let checked = "";
		if(el.bought) {
            checked = "checked";
                     }
		content += '<div id="foodItem"><input type="checkbox" id="check'+[i]+'"><span>' + el.fooditem + '</span> <button class="deleteItem">X</button></div>';
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



    /*
    .forEach((el, i) => {
    el.addEventListener("click", () => {
        myList.delItem(i);
         refreshView();
    })
}); */
    
    
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
    
    
    
};
	
		
