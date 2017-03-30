import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../contacts.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
    myContacts: any[];
    constructor(private _contactService: ContactsService) {
    }

    ngOnInit() {
        this.myContacts = this._contactService.myContacts;
    }

}
