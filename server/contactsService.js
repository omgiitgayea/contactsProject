/**
 * Created by GodaiYuusaku on 3/30/17.
 */
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
    let collection = db.collection('contacts');
    collection.find({}).sort(sortDir).toArray((err, docs) => {
        callback(docs);
    })
}

function getDBContacts(db, searchParams = null, sortDir = null, callback) {
    let collection = db.collection('contacts');
    collection.find({
        $and: [
            {"firstName": new RegExp(searchParams.firstName, "i")},
            {"lastName": new RegExp(searchParams.lastName, "i")}
        ]
    }).sort(sortDir).toArray((err, docs) => {
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

function findContact(parameter, sortInfo, callback) {
    MongoClient.connect(url, (err, db) => {
        getDBContacts(db, parameter, sortInfo, (list) => {
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

exports.getAllContacts = getAllContacts;
exports.addContacts = addContact;
exports.findContact = findContact;
exports.editContact = editContact;
exports.deleteContact = deleteContact;
