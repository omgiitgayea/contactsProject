/**
 * Created by GodaiYuusaku on 3/30/17.
 */
const contactRepo = require('./contactsRepository');
function getAllContacts() {
    // console.log(contactRepo.sendContacts());
    return contactRepo.sendContacts();
};

function findContact(parameter, field) {
    let allContacts = getAllContacts();
}

exports.getAllContacts = getAllContacts;
