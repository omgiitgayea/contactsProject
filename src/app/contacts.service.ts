import {Injectable} from '@angular/core';

@Injectable()
export class ContactsService {

    myContacts = [
        {firstName: 'Joseph', lastName: 'Gatto', contactKey: 'a1'},
        {firstName: 'Salvatore', lastName: 'Volcano', contactKey: 'b1'},
        {firstName: 'Brian', lastName: 'Quinn', contactKey: 'c1'},
        {firstName: 'James', lastName: 'Murray', contactKey: 'd1'},
    ];

    constructor() {
    }
    getContactByKey(contactKey: string): any {
        let myContact: any = null;
        // this.myContacts.forEach((contact) => {
        //     if (contact.contactKey === contactKey) {
        //         myContact = contact;
        //     }
        // });
        for (let i = 0; i < this.myContacts.length; i++) {
            if (this.myContacts[i].contactKey === contactKey) {
                myContact = this.myContacts[i];
                break;
            }
        }
        return myContact;
    };

}
