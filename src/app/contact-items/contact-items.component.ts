import {Component, Input, OnInit} from '@angular/core';
import {ContactsService} from '../contacts.service';

@Component({
    selector: 'app-contact-items',
    templateUrl: './contact-items.component.html',
    styleUrls: ['./contact-items.component.css']
})
export class ContactItemsComponent implements OnInit {
    @Input() public searchParam: string;
    @Input() public isContactKey: boolean;
    @Input() public contact: any;
    editing: boolean;

    constructor(private _contactService: ContactsService) {
    }

    ngOnInit() {
        this.editing = false;
    }

    editContact() {
        this.editing = true;
    }
    deleteContact(key) {
        console.log(`Delete ${key}`);
    }
    saveNewDetails(key) {
        this.editing = false;
        console.log(`Save ${key}`);
    }
}
