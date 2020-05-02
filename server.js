// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Data
//Classes ... for now in this file:

class Customer {
    constructor({ name, phone, email, id }) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.id = id;
        this.waitList = false;
    }
}

const customers = [];

//Get Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/viewres", function (req, res) {
    res.sendFile(path.join(__dirname, "viewres.html"));
});

app.get("/newres", function (req, res) {
    res.sendFile(path.join(__dirname, "newres.html"));
});

app.get("/api/customers", function (req, res) {
    return res.json(customers);
});

app.get("/api/tables", (req, res) => {
    const tables = [];
    for (let i = 0; i < 5; i++) {
        tables.push(customers[i]);
    }
    return res.json(tables);
});

app.get("/api/waitlist", (req, res) => {
    const waiting = [];
    for (let i = 5; i < customers.length; i++) {
        waiting.push(customers[i]);
    }
    return res.json(waiting);
});

//Post Routes
app.post("/api/customers", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    const reservation = new Customer(req.body);
    if (customers.length > 5) reservation.waitList = true;
    console.log(reservation);
    customers.push(reservation);
    res.json(reservation);
});

//start the server
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

