import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../contacts.service';

@Component({
    selector: 'app-contact-header',
    templateUrl: './contact-header.component.html',
    styleUrls: ['./contact-header.component.css']
})
export class ContactHeaderComponent implements OnInit {
    fields: any[] = [{
        fieldName: 'First Name',
        order: 0,
        field: 'firstName'
    },
        {
            fieldName: 'Last Name',
            order: 0,
            field: 'lastName'
        },
        {
            fieldName: 'Phone Number',
            order: 0,
            field: 'phoneNo'
        },
        {
            fieldName: 'Email',
            order: 0,
            field: 'email'
        }
    ];

    constructor(private _contactsService: ContactsService) {
    }

    ngOnInit() {
    }

    sort(fieldName: string) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].fieldName === fieldName) {
                if (this.fields[i].order === 1) {
                    this.fields[i].order = -1;
                }
                else {
                    this.fields[i].order++;
                }
                let sortOrder = {};
                if (this.fields[i].order === 0) {
                    sortOrder = null;
                }
                else {
                    sortOrder[this.fields[i].field] = this.fields[i].order;
                }
                this._contactsService.sortContact(sortOrder);
            }
            else {
                this.fields[i].order = 0;
            }
        }
    }
}
