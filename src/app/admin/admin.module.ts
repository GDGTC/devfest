import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { ScheduleComponent } from './schedule.component';
import { AdminNavComponent } from './admin-nav.component';
import { SpeakerSelector } from './speaker-selector.component';
import { ReportsComponent } from './reports.component';
import { VolunteersComponent } from './volunteers.component';
import { SpeakerEditComponent } from './speaker-edit.component';
import { SessionEditComponent } from './session-edit.component';
import { AdminHomeComponent } from './admin-home.component';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTabsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forChild([
            {
                path: '', component: AdminComponent, children: [
                    { path: ':year/speakers/:id/edit', component: SpeakerEditComponent },
                    { path: ':year/sessions/:id/edit', component: SessionEditComponent },
                    { path: ':year/sessions/:id/edit/:time/:room', component: SessionEditComponent },
                    { path: '', component: AdminHomeComponent },
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
        AdminNavComponent,
        ScheduleComponent,
        SpeakerSelector,
        ReportsComponent,
        VolunteersComponent,
        SpeakerEditComponent,
        SessionEditComponent,
        AdminHomeComponent,
    ]
})
export class AdminModule { }
