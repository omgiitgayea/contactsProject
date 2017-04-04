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
        currentSort: false,
        reverseOrder: false
    },
        {
            fieldName: 'Last Name',
            currentSort: false,
            reverseOrder: false
        }
    ];

    constructor(private _contactsService: ContactsService) {
    }

    ngOnInit() {
    }

    sort(fieldName: string) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].fieldName === fieldName) {
                if (this.fields[i].currentSort) {
                    if (this.fields[i].reverseOrder) {
                        this.fields[i].reverseOrder = false;
                    }
                    else {
                        this.fields[i].reverseOrder = true;
                    }
                }
                else {
                    this.fields[i].currentSort = true;
                }
                this._contactsService.sortContact(this.fields[i].fieldName, this.fields[i].reverseOrder);
            }
            else {
                this.fields[i].currentSort = false;
                this.fields[i].reverseOrder = false;
            }
        }
    }
}
