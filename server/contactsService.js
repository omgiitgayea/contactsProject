/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactRepo = require('./contactsRepository');
function getAllContacts() {
    // console.log(contactRepo.sendContacts());
    return contactRepo.sendContacts();
}

// search logic isn't complete yet
function findContact(parameter) {
    let allContacts = getAllContacts();
    let foundContacts = [];
    // for (let i = 0; i < allContacts.length; i++) {
    //     if (allContacts[i].firstName.toLowerCase().indexOf(parameter.firstName.toLowerCase()) != -1 && allContacts[i].lastName.toLowerCase().indexOf(parameter.lastName.toLowerCase()) != -1) {
    //         foundContacts.push(allContacts[i]);
    //     }
    // }
    foundContacts = allContacts.filter((contact) => {
        return (contact.firstName.toLowerCase().indexOf(parameter.firstName.toLowerCase()) != -1 && contact.lastName.toLowerCase().indexOf(parameter.lastName.toLowerCase()) != -1)

    });
    return foundContacts;
}

function addContact(newContact) {
    newContact.contactKey = contactRepo.getNewID();
    contactRepo.addContact(newContact);
    return newContact;
}

function editContact(changedContact) {
    contactRepo.updateContacts(changedContact);
}

function deleteContact(nixedContactID) {

}

exports.getAllContacts = getAllContacts;
exports.addContacts = addContact;
exports.findContact = findContact;
exports.editContact = editContact;
exports.deleteContact = deleteContact;
