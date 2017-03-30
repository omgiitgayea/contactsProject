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
    private currentContact: any;

    constructor(private _contactService: ContactsService) {
    }

    ngOnInit() {
        if (this.isContactKey) {
            this.currentContact = this._contactService.getContactByKey(this.searchParam);
        }
        else {
            this.currentContact = this._contactService.getContactByParam(this.searchParam);
        }
    }

}
