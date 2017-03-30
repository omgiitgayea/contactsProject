/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(3000, () => {
    console.log("Wow, someone's actually listening to me!")
});

app.use(express.static("public"));

app.post("/loggedIn", (req, res) => {
    console.log(req.body);
});
