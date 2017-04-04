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
app.route("/contacts")
    .get((req, res) => {
        res.send(contactServ.getAllContacts());
    })
    .post((req, res) => {
        let results = contactServ.findContact(req.body.parameter);
        res.send(results);
    })
    .put((req, res) => {
        let newContact = contactServ.addContacts(req.body.parameter);
        res.send(newContact);
    });

app.delete("/contacts/:key", (req, res) => {
    contactServ.deleteContact(req.params.key);
    res.send(req.params.key);
});

app.put("/editContact", (req, res) => {
    contactServ.editContact(req.body.parameter);
    res.send(req.body.parameter);
});

app.put("/sortContacts", (req, res) => {
    let sortedArray = contactServ.sortContacts(req.body.parameter);
    res.send(sortedArray)
});

app.put("/sortSearch", (req, res) => {
    let sortedSearchArray = contactServ.sortSearch(req.body.parameter);
    res.send(sortedSearchArray);
});
