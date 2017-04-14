/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactRepo = require('./contactsRepository');
const KEY_SIZE = 5;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/myContacts';

function insertContact (db, newContact, callback) {
    let collection = db.collection('contacts');
    collection.insertMany([newContact], (err, result) => {
        callback(result);
    })
}

function getDBContacts(db, searchParams = null, callback) {
    let collection = db.collection('contacts');
    collection.find(searchParams).toArray((err, docs) => {
        callback(docs);
    })

}

function getAllContacts(callback) {
    MongoClient.connect(url, (err, db) => {
        getDBContacts(db, null, (list) => {
            db.close();
            callback(list);
        })
    });
}

function findContact(parameter, callback) {
    MongoClient.connect(url, (err, db) => {
        getDBContacts(db, parameter, (list) => {
            db.close();
            callback(list);
        })
    })
}

function addContact(newContact) {
    MongoClient.connect(url, (err, db) => {
        insertContact(db, newContact, () => {
            db.close();
        })
    });
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
