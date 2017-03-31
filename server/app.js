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

app.get("/getAllContacts", (req, res) => {
    res.send(contactServ.getAllContacts());
});

app.post("/findContact", (req, res) => {
    console.log(req.body.parameter);
    res.send(req.body.parameter);

});
