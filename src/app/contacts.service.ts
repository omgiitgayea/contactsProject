import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class ContactsService {
    private baseUrl = 'http://localhost:3000';
    myContacts = [
        {firstName: 'Joseph', lastName: 'Gatto', contactKey: 'a1'},
        {firstName: 'Salvatore', lastName: 'Volcano', contactKey: 'b1'},
        {firstName: 'Brian', lastName: 'Quinn', contactKey: 'c1'},
        {firstName: 'James', lastName: 'Murray', contactKey: 'd1'},
    ];
    private fullContactList: any[];
    fullContactListSub = new Subject<any>();
    fullContactListSub$ = this.fullContactListSub.asObservable();

    constructor(private http: Http) {
    }

    getContactByKey(contactKey: string): any {
        let myContact: any = null;
        // this.myContacts.forEach((contact) => {
        //     if (contact.contactKey === contactKey) {
        //         myContact = contact;
        //     }
        // });
        for (let i = 0; i < this.myContacts.length; i++) {
            if (this.myContacts[i].contactKey === contactKey) {
                myContact = this.myContacts[i];
                break;
            }
        }
        // this.http.get(`${this.baseUrl}/aTest`);
        // this.getAllContacts();
        return myContact;
    };

    getContactByParam(parameter: string): any {
        let myContact: any = null;
        return myContact;
    }

    // will make a contact class
    addContact(newContact: any): void {
        this.myContacts.push(newContact);
    }

    getAllContacts(): Promise<any> {
        return this.http.get(`${this.baseUrl}/getAllContacts`)
            .toPromise()
            .then(response => {
                this.fullContactList = response.json();
                this.fullContactListSub.next(this.fullContactList);
            })
            .catch((error: any) => Observable.throw(error));
    }

    // findContact(parameters: any): void {
    //     console.log(parameters + ' from component');
    // }
    findContact(parameters: any): Promise<any> {
        return this.http
            .post(`${this.baseUrl}/findContact`, {parameter: parameters})
            .toPromise()
            .then(response => {
                console.log(response.json());
            })
            .catch((error: any) => Observable.throw(error));
    }
}
