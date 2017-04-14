/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactRepo = require('./contactsRepository');
const KEY_SIZE = 5;

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017/myContacts';

function insertContact(db, newContact, callback) {
    let collection = db.collection('contacts');
    collection.insertMany([newContact], (err, result) => {
        callback(result);
    })
}

function getAllDDBContacts(db, sortDir = null, callback ) {
    let fieldName = "firstName";
    let testObj = {};
    testObj[fieldName] = -1; // may want to use elsewhere now. testObj = {fieldName : -1}
    // let aTest = null; // can use aTest = null for no sort, aTest = {fieldName: -1 or 1} for sorting
    let collection = db.collection('contacts');
    collection.find({}).sort(sortDir).toArray((err, docs) => {
        callback(docs);
    })
}

function getDBContacts(db, searchParams = null, callback) {
    let collection = db.collection('contacts');
    collection.find({
        $and: [
            {"firstName": new RegExp(searchParams.firstName, "i")},
            {"lastName": new RegExp(searchParams.lastName, "i")}
        ]
    }).toArray((err, docs) => {
        callback(docs);
    })
}
function deleteDBContact(db, key, callback) {
    let collection = db.collection('contacts');
    collection.deleteOne({"_id": ObjectId(key)}, (err, result) => {
        callback(result);
    })
}

function getAllContacts(sortInfo, callback) {
    MongoClient.connect(url, (err, db) => {
        getAllDDBContacts(db, sortInfo, (list) => {
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

function updateContact(db, changedContact, callback) {
    let collection = db.collection('contacts');
    collection.updateOne({"_id": ObjectId(changedContact._id)}, {
        $set: {
            "firstName": changedContact.firstName,
            "lastName": changedContact.lastName,
            "email": changedContact.email,
            "phoneNo": changedContact.phoneNo
        }
    }, (err, result) => {
        callback(result);
    });
}

function editContact(changedContact) {
    MongoClient.connect(url, (err, db) => {
        updateContact(db, changedContact, () => {
            db.close();
        })
    });
}

function deleteContact(nixedContactID) {
    MongoClient.connect(url, (err, db) => {
        deleteDBContact(db, nixedContactID, () => {
            db.close();
        })
    });
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
        if (sortParams.reverseOrder) {
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
        if (sortParams.reverseOrder) {
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
    return (allContacts);
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

/*Adding a contact
 getting all contacts
 deleting a contact
 finding a contact
 edit a contact

 Left to do:
 sort contacts
 * */
