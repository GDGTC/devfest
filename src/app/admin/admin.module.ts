import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SFFBModule } from './sffb/sffb.module';

import { RouterModule, UrlSegment } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './admin-nav.component';
import { SpeakerSelector } from './speaker-selector.component';
import { ReportsComponent } from './reports.component';
import { VolunteersComponent } from './volunteers.component';
import { SpeakerEditComponent } from './speaker-edit.component';
import { SessionEditComponent } from './session-edit.component';
import { AdminHomeComponent } from './admin-home.component';
import { YearSwitcherComponent } from './year-switcher.component';

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
                    // Doing the years like this for admins is kind of Gross, but to fix it we need a separate admin service that knows how to use years
                    { matcher: isYear, component: YearSwitcherComponent, children: [
                        { path: 'speakers/:id/edit', component: SpeakerEditComponent },
                        { path: 'sessions/:id/edit', component: SessionEditComponent },
                        { path: 'sessions/:id/edit/:time/:room', component: SessionEditComponent },
                    ]},
                    { path: '', component: AdminHomeComponent },
                    { path: 'reports', component: ReportsComponent },
                    { path: 'volunteers', component: VolunteersComponent },
                ]
            },
        ]),
        FormsModule,
        SharedModule,
        SFFBModule,
    ],
    declarations: [
        AdminComponent,
        AdminNavComponent,
        SpeakerSelector,
        ReportsComponent,
        VolunteersComponent,
        SpeakerEditComponent,
        SessionEditComponent,
        AdminHomeComponent,
        YearSwitcherComponent,
    ]
})
export class AdminModule { }

export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? ({consumed:[url[0]]}) : null;
}
