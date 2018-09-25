"use strict";

let express = require("express");
let bodyparser = require("body-parser");

let server = express();
server.use(express.static("public"));
server.use(bodyparser.json());

let listModule = require("./listmodule.js")

let myList = new listModule.ShopingList();
myList.add("Äpfel");
myList.add("Bannnnnanen");

//alle Punkte
server.get("/items", (req,res) => {
    console.log("Punkte abgefragt");
    res.send(myList);
});

//hinzufügen
server.post("/items", (req,res) => {
	
    let text = req.body.text;
    myList.add(text);
    console.log("Punkt hinzugefügt: " + text);
    res.send(myList);
});

//Einzelnes Element löschen
server.post("/delItem", (req,res) => {
	
    let index = req.body.index;
    myList.delItem(index);
	console.log ( 'Element gelöscht' );
    res.send(myList);
});

//update
server.put("/items/:ind", (req,res) => {
    let ind = req.params.ind;
    let item = req.body;
    myList.getList()[ind] = item;
    console.log("Punkt " + ind + " geändert " + item.fooditem + " " + item.bought);
    res.send(myList);
});

//löschen gekauftes
server.delete("/items", (req,res) => {
    myList.clean();
    console.log("Gekauftes gelöscht");
    res.send();
})


server.listen(80);