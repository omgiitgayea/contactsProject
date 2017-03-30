import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ContactsComponent} from './contacts/contacts.component';
import {ContactItemsComponent} from './contact-items/contact-items.component';
import {ContactsService} from './contacts.service';
import {NoPageComponent} from './no-page/no-page.component';
import {RouterModule} from '@angular/router';
import { FindContactComponent } from './find-contact/find-contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        ContactItemsComponent,
        NoPageComponent,
        FindContactComponent,
        AddContactComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: 'findContact', component: FindContactComponent},
            {path: 'addContact', component: AddContactComponent},
            {path: 'fullList', component: ContactsComponent},
            {path: '', component: NoPageComponent},
            {path: '**', component: NoPageComponent}
        ])
    ],
    providers: [ContactsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
