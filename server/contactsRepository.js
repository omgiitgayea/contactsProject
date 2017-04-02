/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const KEY_SIZE = 5;
let myContacts = [
    {firstName: 'Joseph', lastName: 'Gatto', contactKey: 'a1'},
    {firstName: 'Salvatore', lastName: 'Vulcano', contactKey: 'b1'},
    {firstName: 'Brian', lastName: 'Quinn', contactKey: 'c1'},
    {firstName: 'James', lastName: 'Murray', contactKey: 'd1'},
    {firstName: 'Larry', lastName: 'Santiago', contactKey: 'e1'},
    {firstName: 'Tony', lastName: 'Gunk', contactKey: 'f1'},
];

exports.sendContacts = function () {
    return myContacts;
};

function addContact(newContact) {
    myContacts.push(newContact);
    console.log(`Now my contact list has ${myContacts.length} items.`);
}

function makeID() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < KEY_SIZE; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getNewID() {
    let newID = makeID();
    let isNew = true;
    for (let i = 0; i < myContacts.length; i++) {
        if(newID === myContacts[i].contactKey) {
            isNew = false;
        }
    }
    if (isNew) {
        return newID;
    }
    else {
        console.log("Wow, a duplicate....");
        getNewID();
    }
}

function updateContacts(updatedContact) {
    for (let i = 0; i < myContacts.length; i++) {
        if (updatedContact.contactKey === myContacts[i].contactKey) {
            myContacts[i] = updatedContact;
            break;
        }
    }
}

exports.addContact = addContact;
exports.getNewID = getNewID;
exports.updateContacts = updateContacts;
//
// var module;
// module.exports = {};
// var module;
// module.exports({
//
// });
