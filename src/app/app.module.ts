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

@NgModule({
    declarations: [
        AppComponent,
        ContactsComponent,
        ContactItemsComponent,
        NoPageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', component: ContactsComponent},
            {path: '**', component: NoPageComponent}
        ])
    ],
    providers: [ContactsService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
