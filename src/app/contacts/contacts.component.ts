import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../contacts.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
    myContacts: any[];
    fullContactsSubscription: Subscription;
    constructor(private _contactService: ContactsService) {
        this.fullContactsSubscription = _contactService.fullContactListSub$.subscribe(
            fullList => {
                this.myContacts = fullList;
            });
    }

    ngOnInit() {
        this._contactService.getAllContacts();
        // console.log(this.myContacts);
        // this.myContacts = this._contactService.myContacts;
    }

}
