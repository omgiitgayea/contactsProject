import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../contacts.service';
import {Contact} from '../contact';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.component.html',
    styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
    firstName = '';
    lastName = '';
    error = false;
    newContact: any;
    newContactSubscription: Subscription;
    constructor(private _contactsService: ContactsService) {
        this.newContactSubscription = _contactsService.newContactSub$.subscribe(
            newContact => {
                this.newContact = newContact;
            });
    }

    ngOnInit() {
    }

    enterPressed(event) {
        if (event.keyCode === 13) {
            this.addContact();
        }
    }

    addContact(): void {
        if ((this.firstName === '') && (this.lastName === '')) {
            this.error = true;
        }
        else {
            const newContact: Contact = new Contact(this.firstName, this.lastName);
            this._contactsService.addContact(newContact);
            this.firstName = '';
            this.lastName = '';
            this.error = false;
        }
    }
}
