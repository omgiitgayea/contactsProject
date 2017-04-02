/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactServ = require("./contactsService");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(3000, () => {
    console.log("Wow, someone's actually listening to me!")
});

app.use(express.static("public"));

// more or less done
app.get("/getAllContacts", (req, res) => {
    res.send(contactServ.getAllContacts());
});

// more or less done
app.post("/findContact", (req, res) => {
    let results = contactServ.findContact(req.body.parameter);
    res.send(results);
});

// more or less done
app.put("/addContact", (req, res) => {
    let newContact = contactServ.addContacts(req.body.parameter);
    res.send(newContact);
});

// app.delete();

// app.put("/editContact")
