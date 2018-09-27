"use strict";

//----------------- Server ----------------------------------
//-----------------------------------------------------------

let express = require("express");
let cookieSession = require("cookie-session");
let fs = require("fs");
let uuid = require('uuid');
let passport = require("passport");
let Strategy = require("passport-local").Strategy;




let bodyparser = require("body-parser");
let listModule = require("./listmodule.js");

let server = express();
server.use(express.static("public"));

server.set("views", __dirname + "//public");
server.set("view engine", "jade");




//--------------------------

server.use(cookieSession({
	name: "session",
	keys: ["key1", "key2"]
}));

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: false}));

// ----------------- Login ----------------------------------
//-----------------------------------------------------------

let uniqueId;
let userName;

server.post("/", (req,res) => {
	let user = req.body.username,
	pw = req.body.password;
	
	if (user === "Maria" && pw === "1234") {
		req.session.user = "Maria";
		res.redirect("/app");
		uniqueId = uuid();
		console.log(req.session.user + " ist angemeldet ID:" + uniqueId);
	} else if (user === "Max" && pw === "1234") {
		req.session.user = "Max";
		console.log(req.session.user + " ist angemeldet ID:" + uniqueId);
		uniqueId = uuid();
		res.redirect("/app");
	} else {
		//req.session.user = "anonym";
		console.log(req.session.user + " hat versucht anzumelden. ID:" + uniqueId);
		res.redirect("/");
	} 
	userName = user;
	
});





let checkAuth = (req,res,next) => {
	if(!req.session.user) {
		res.redirect("/");
	} else {
		next();
	}
};

	
	
server.get("/app", checkAuth, (req,res) => {
	res.render("app", {userName: userName});
	
});
// ----- Versuch die Seite "app.html" zu blokieren -------------
//--------------------------------------------------------------




server.get("/logout", (req,res) => {
	console.log(req.session.user + " ist abgemeldet. ID: " +uniqueId);
	delete req.session.user;
	uniqueId = undefined;
	console.log(uniqueId);
	res.redirect("/");
})




// --------------------Die Liste -------------------------------
//--------------------------------------------------------------



let myList = new listModule.ShopingList();
myList.add("Äpfel");
myList.add("Bananen");



//alle Punkte
server.get("/items", (req,res) => {
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
});



server.listen(80);