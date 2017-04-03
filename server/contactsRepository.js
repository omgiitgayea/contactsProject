/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const fs = require("fs");

function writeContactFile(contacts) {
    let data = `{"contacts":[`;
    for(let i = 0; i < contacts.length; i++) {
        data += JSON.stringify(contacts[i]);
        if (i !== contacts.length - 1) {
            data += ","
        }
    }
    data += "]}";
    fs.writeFileSync("public/contacts.json", data);
}

function readContactFile() {
    let data = fs.readFileSync("./public/contacts.json", "UTF-8");
    return data;
}

exports.writeContactFile = writeContactFile;
exports.readContactFile = readContactFile;
