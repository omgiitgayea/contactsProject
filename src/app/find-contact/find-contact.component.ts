import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactsService} from '../contacts.service';

@Component({
    selector: 'app-find-contact',
    templateUrl: './find-contact.component.html',
    styleUrls: ['./find-contact.component.css']
})
export class FindContactComponent implements OnInit {
    firstName: string = '';
    lastName: string = '';
    constructor(private _contactsService: ContactsService) {
    }

    ngOnInit() {
    }

    findContact(): void {
        let searchContact: Contact = new Contact(this.firstName, this.lastName);
        this._contactsService.findContact(searchContact);
        this.firstName = '';
        this.lastName = '';
    }
}
