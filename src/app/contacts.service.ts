import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable, Subject} from 'rxjs';
import {Contact} from './contact';

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

    private newContact: any;
    newContactSub = new Subject<any>();
    newContactSub$ = this.newContactSub.asObservable();

    private searchResults: any;
    searchResultsSub = new Subject<any>();
    searchResultsSub$ = this.searchResultsSub.asObservable();

    redoSearchSub = new Subject<any>();
    redoSearchSub$ = this.redoSearchSub.asObservable();

    constructor(private http: Http) {
    }

    getContactByKey(contactKey: string): any {
        let myContact: any = null;
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

    getAllContacts(): Promise<any> {
        return this.http.get(`${this.baseUrl}/contacts`)
            .toPromise()
            .then(response => {
                this.fullContactList = response.json();
                this.fullContactListSub.next(this.fullContactList);
            })
            .catch((error: any) => Observable.throw(error));
    }

    findContact(parameters: any): Promise<any> {
        return this.http
            .post(`${this.baseUrl}/contacts`, {parameter: parameters})
            .toPromise()
            .then(response => {
                this.searchResults = response.json();
                this.searchResultsSub.next(this.searchResults);
            })
            .catch((error: any) => Observable.throw(error));
    }

    addContact(newContact: Contact): Promise<any> {
        return this.http
            .put(`${this.baseUrl}/contacts`, {parameter: newContact})
            .toPromise()
            .then(response => {
                this.newContact = response.json();
                this.newContactSub.next(this.newContact);
            })
            .catch((error: any) => Observable.throw(error));
    }

    deleteContact(nixedContactKey: string): Promise<any> {
        return this.http
            .delete(`${this.baseUrl}/contacts/${nixedContactKey}`)
            .toPromise()
            .then((response) => {
                this.getAllContacts();
                this.redoSearchSub.next();
                console.log(response);
            })
            .catch((error: any) => Observable.throw(error));
    }

    editContact(changedContact: Contact): Promise<any> {
        return this.http
            .put(`${this.baseUrl}/editContact`, {parameter: changedContact})
            .toPromise()
            .then(() => {})
            .catch((error: any) => Observable.throw(error));
    }

    sortContact(fieldName: string, reverseOrder: boolean): Promise<any> {
        return this.http
            .put(`${this.baseUrl}/sortContacts`, {parameter: {fieldName: fieldName, reverseOrder: reverseOrder}})
            .toPromise()
            .then((response) => {
                this.fullContactList = response.json();
                this.fullContactListSub.next(this.fullContactList);
            })
            .catch((error: any) => Observable.throw(error));
    }

    sortSearch(fieldName: string, reverseOrder: boolean, params: Contact): Promise<any> {
        return this.http
            .put(`${this.baseUrl}/sortSearch`, {
                parameter: {
                    fieldName: fieldName,
                    reverseOrder: reverseOrder,
                    search: params
                }
            })
            .toPromise()
            .then((response) => {
                this.searchResults = response.json();
                this.searchResultsSub.next(this.searchResults);
            })
            .catch((error: any) => Observable.throw(error));
    }
}
