import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactsService} from '../contacts.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-find-contact',
    templateUrl: './find-contact.component.html',
    styleUrls: ['./find-contact.component.css']
})
export class FindContactComponent implements OnInit {
    firstName = '';
    lastName = '';
    phoneNo = '';
    email = '';
    searchResults: any[];
    searchResultsSubscription: Subscription;
    redoSearch: Subscription;

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
        this.searchResultsSubscription = _contactsService.searchResultsSub$.subscribe(
            results => {
                this.searchResults = results;
            });
        this.redoSearch = _contactsService.redoSearchSub$.subscribe(
            () => {
                const searchContact: Contact = new Contact(this.firstName, this.lastName, this.email, this.phoneNo);
                this._contactsService.findContact(searchContact);
            });
    }

    ngOnInit() {
    }

    clearFields(): void {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNo = '';
        this.searchResults = null;
    }

    autoComplete(ev: any): void {
        const val = ev.target.value;
        if ((val && val.trim() !== '') || this.firstName !== '' || this.lastName !== '' || this.email !== '' || this.phoneNo !== '') {
            const searchContact: Contact = new Contact(this.firstName, this.lastName, this.email, this.phoneNo);
            for (let i = 0; i < this.fields.length; i++) {
                this.fields[i].currentSort = false;
                this.fields[i].reverseOrder = false;
            }
            this._contactsService.findContact(searchContact);
        }
        else {
            this.searchResults = [];
        }
    }

    sort(fieldName): void {
        const searchContact: Contact = new Contact(this.firstName, this.lastName, this.email, this.phoneNo);
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
                this._contactsService.sortSearch(sortOrder, searchContact);
            }
            else {
                this.fields[i].order = 0;
            }
        }
    }
}
