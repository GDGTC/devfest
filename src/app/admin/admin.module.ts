import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { SpeakersComponent } from './speakers.component';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
            authDomain: "devfestmn.firebaseapp.com",
            databaseURL: "https://devfestmn.firebaseio.com",
            storageBucket: "firebase-devfestmn.appspot.com",
        }, {method: AuthMethods.Popup, provider: AuthProviders.Google}),
        RouterModule.forChild([
            {path: '', component: AdminComponent},
            {path: 'speakers', component: SpeakersComponent}            
        ]),
        FormsModule
    ],
    declarations: [
        AdminComponent,
        SpeakersComponent
    ]
})
export class AdminModule {}