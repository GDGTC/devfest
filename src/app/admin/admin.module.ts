import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { RouterModule, UrlSegment } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin-home.component';
import { AdminNavComponent } from './admin-nav.component';
import { AdminComponent } from './admin.component';
import { ReportsComponent } from './reports.component';
import { SessionEditComponent } from './session-edit.component';
import { SessionReportComponent } from './session-report.component';
import { SFFBModule } from './sffb/sffb.module';
import { SpeakerEditComponent } from './speaker-edit.component';
import { SpeakerSelectorComponent } from './speaker-selector.component';
import { VolunteersComponent } from './volunteers.component';
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
                path: '',
                component: AdminComponent,
                children: [
                    // Doing the years like this for admins is kind of Gross, but to fix
                    // it we need a separate admin service that knows how to use years
                    {
                        matcher: isYear,
                        component: YearSwitcherComponent,
                        children: [
                            { path: 'speakers/:id/edit', component: SpeakerEditComponent },
                            { path: 'sessions/:id/edit', component: SessionEditComponent },
                            { path: 'sessions/:id/edit/:time/:room', component: SessionEditComponent },
                            { path: 'session-report', component: SessionReportComponent },
                        ],
                    },
                    { path: '', component: AdminHomeComponent },
                    { path: 'reports', component: ReportsComponent },
                    { path: 'volunteers', component: VolunteersComponent },
                ],
            },
        ]),
        FormsModule,
        SharedModule,
        SFFBModule,
        HttpClientModule,
    ],
    declarations: [
        AdminComponent,
        AdminNavComponent,
        SpeakerSelectorComponent,
        ReportsComponent,
        VolunteersComponent,
        SpeakerEditComponent,
        SessionEditComponent,
        AdminHomeComponent,
        YearSwitcherComponent,
        SessionReportComponent,
    ],
})
export class AdminModule {}

export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? { consumed: [url[0]] } : null;
}
