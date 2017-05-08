import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MdInputModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCheckboxModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { SpeakersComponent } from './speakers.component';
import { ScheduleComponent } from './schedule.component';
import { AdminNavComponent } from './admin-nav.component';
import { SpeakerSelector } from './speaker-selector.component';
import { ReportsComponent } from './reports.component';
import { VolunteersComponent } from './volunteers.component';

@NgModule({
    imports: [
        CommonModule,
        MdInputModule.forRoot(),
        MdButtonModule.forRoot(),
        MdCheckboxModule.forRoot(),
        MdTabsModule.forRoot(),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
            authDomain: "devfestmn.firebaseapp.com",
            databaseURL: "https://devfestmn.firebaseio.com",
            storageBucket: "firebase-devfestmn.appspot.com",
        }, { method: AuthMethods.Popup, provider: AuthProviders.Google }),
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    { path: 'speakers', component: SpeakersComponent },
                    { path: '', component: ScheduleComponent },
                    { path: 'reports', component: ReportsComponent },
                    { path: 'volunteers', component: VolunteersComponent },
                ]
            },
        ]),
        FormsModule,
        SharedModule,
    ],
    declarations: [
        AdminComponent,
        SpeakersComponent,
        AdminNavComponent,
        ScheduleComponent,
        SpeakerSelector,
        ReportsComponent,
        VolunteersComponent,
    ]
})
export class AdminModule { }