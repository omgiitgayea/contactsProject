import {Component, OnInit} from '@angular/core';
import {Contact} from '../contact';
import {ContactsService} from '../contacts.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-find-contact',
    templateUrl: './find-contact.component.html',
    styleUrls: ['./find-contact.component.css']
})
export class FindContactComponent implements OnInit {
    firstName: string = '';
    lastName: string = '';
    searchResults: any[];
    searchResultsSubscription: Subscription;
    constructor(private _contactsService: ContactsService) {
        this.searchResultsSubscription = _contactsService.searchResultsSub$.subscribe(
            results => {
                this.searchResults = results;
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
        if (val && val.trim() !== '') {
            const searchContact: Contact = new Contact(this.firstName, this.lastName);
            this._contactsService.findContact(searchContact);
        }
    }
}
