/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactRepo = require('./contactsRepository');
const KEY_SIZE = 5;

function getAllContacts() {
    let allContactsJSON = contactRepo.readContactFile();
    let allContacts = JSON.parse(allContactsJSON).contacts;
    return allContacts;
}

function findContact(parameter) {
    let allContacts = getAllContacts();
    let foundContacts;
    foundContacts = allContacts.filter((contact) => {
        return (contact.firstName.toLowerCase().indexOf(parameter.firstName.toLowerCase()) != -1 && contact.lastName.toLowerCase().indexOf(parameter.lastName.toLowerCase()) != -1)

    });
    return foundContacts;
}

function addContact(newContact) {
    let allContacts = getAllContacts();
    newContact.contactKey = getNewID(allContacts);
    allContacts.push(newContact);
    contactRepo.writeContactFile(allContacts);
    return newContact;
}

function editContact(changedContact) {
    let allContacts = getAllContacts();
    for (let i = 0; i < allContacts.length; i++) {
        if (changedContact.contactKey === allContacts[i].contactKey) {
            allContacts[i] = changedContact;
            break;
        }
    }
    contactRepo.writeContactFile(allContacts);
}

function deleteContact(nixedContactID) {
    let allContacts = getAllContacts();
    allContacts = allContacts.filter((contact) => {
        return contact.contactKey !== nixedContactID;
    });
    contactRepo.writeContactFile(allContacts);
}

function makeID() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < KEY_SIZE; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getNewID(allContacts) {
    let newID = makeID();
    let isNew = true;
    for (let i = 0; i < allContacts.length; i++) {
        if (newID === allContacts[i].contactKey) {
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

function sortContacts(sortParams, sortArray = []) {
    let allContacts;
    if (sortArray.length === 0) {
        allContacts = getAllContacts();
    }
    else {
        allContacts = sortArray;
    }

    if (sortParams.fieldName === "First Name") {
        if(sortParams.reverseOrder) {
            allContacts.sort((a, b) => {
                return (a.firstName.toLowerCase() < b.firstName.toLowerCase()) ? 1 : ((b.firstName.toLowerCase() < a.firstName.toLowerCase()) ? -1 : 0);
            });
        }
        else {
            allContacts.sort((a, b) => {
                return (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : ((b.firstName.toLowerCase() > a.firstName.toLowerCase()) ? -1 : 0);
            });
        }
    }
    else {
        if(sortParams.reverseOrder) {
            allContacts.sort((a, b) => {
                return (a.lastName.toLowerCase() < b.lastName.toLowerCase()) ? 1 : ((b.lastName.toLowerCase() < a.lastName.toLowerCase()) ? -1 : 0);
            });
        }
        else {
            allContacts.sort((a, b) => {
                return (a.lastName.toLowerCase() > b.lastName.toLowerCase()) ? 1 : ((b.lastName.toLowerCase() > a.lastName.toLowerCase()) ? -1 : 0);
            });
        }
    }
    return(allContacts);
}

function sortSearch(sortSearchParams) {
    let foundContacts = findContact(sortSearchParams.search);
    let sortedContacts = sortContacts(sortSearchParams, foundContacts);
    return sortedContacts;
}

exports.getAllContacts = getAllContacts;
exports.addContacts = addContact;
exports.findContact = findContact;
exports.editContact = editContact;
exports.deleteContact = deleteContact;
exports.sortContacts = sortContacts;
exports.sortSearch = sortSearch;
