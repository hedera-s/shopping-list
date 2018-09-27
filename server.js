"use strict";

//----------------- Server ----------------------------------
//-----------------------------------------------------------

let express = require("express");
let cookieSession = require("cookie-session");
let bodyparser = require("body-parser");
let listModule = require("./listmodule.js");

let server = express();
server.use(express.static("public"));


server.use(cookieSession({
	name: "session",
	keys: ["key1", "key2"]
}));

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended: false}));

// ----------------- Login ----------------------------------
//-----------------------------------------------------------


server.post("/login", (req,res) => {
	let user = req.body.username,
	pw = req.body.password;
	if (user === "user1" && pw === "1234") {
	req.session.user = "user1";
	res.redirect("/app");
	} else if (user === "user2" && pw === "1234") {
		req.session.user = "user2";
		res.redirect("/app");
	} else {
		
		res.redirect("/");
		
	}
	
	console.log(req.session.user + " ist angemeldet");
	
});


let checkAuth = (req,res,next) => {
	if(!req.session.user) {
		res.redirect("/");
	} else {
		return next();
	}
};

	
	
server.get("/app", checkAuth, (req,res) => {
	res.redirect("/app.html");
	
});
// ----- Versuch die Seite "app.html" zu blokieren -------------
//--------------------------------------------------------------

server.get("/app.html",(req,res) => {
	if(!req.session.user) {
		res.redirect("/")
		res.end();
	}
});

server.get("/logout", (req,res) => {
	console.log(req.session.user + " ist abgemeldet");
	delete req.session.user;
	res.redirect("/");
})




// --------------------Die Liste -------------------------------


let myList = new listModule.ShopingList();
myList.add("Äpfel");
myList.add("Bananen");

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
});



server.listen(80);