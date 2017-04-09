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
    searchResults: any[];
    searchResultsSubscription: Subscription;
    redoSearch: Subscription;

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
        this.searchResultsSubscription = _contactsService.searchResultsSub$.subscribe(
            results => {
                this.searchResults = results;
            });
        this.redoSearch = _contactsService.redoSearchSub$.subscribe(
            () => {
                const searchContact: Contact = new Contact(this.firstName, this.lastName);
                this._contactsService.findContact(searchContact);
            });
    }

    ngOnInit() {
    }

    clearFields(): void {
        this.firstName = '';
        this.lastName = '';
        this.searchResults = null;
    }

    autoComplete(ev: any): void {
        const val = ev.target.value;
        if ((val && val.trim() !== '') || this.firstName !== '' || this.lastName !== '') {
            const searchContact: Contact = new Contact(this.firstName, this.lastName);
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
        const searchContact: Contact = new Contact(this.firstName, this.lastName);
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
                this._contactsService.sortSearch(this.fields[i].fieldName, this.fields[i].reverseOrder, searchContact);
            }
            else {
                this.fields[i].currentSort = false;
                this.fields[i].reverseOrder = false;
            }
        }
    }
}
