import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';

// Declarations
import { SpeakersComponent } from './speakers.component';
import { ScheduleComponent } from './schedule.component';
import { SessionViewComponent } from './session-view.component';
import { SessionFeedbackComponent } from './session-feedback.component';
import { SpeakersViewComponent } from './speakers-view.component';
import { SpeakerContainerComponent } from './speaker-container.component';
import { SpeakerFullComponent } from './speaker-full.component';
import { UserFeedbackComponent } from './user-feedback.component';
import { StarBarComponent } from './star-bar.component';
import { ScheduleGridComponent } from './schedule-grid.component';
import { SessionDetailsComponent } from './session-details.component';

@NgModule({
    declarations: [
        SpeakersComponent,
        ScheduleComponent,
        SessionViewComponent,
        SessionFeedbackComponent,
        SpeakersViewComponent,
        SpeakerContainerComponent,
        SpeakerFullComponent,
        UserFeedbackComponent,
        StarBarComponent,
        ScheduleGridComponent,
        SessionDetailsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFirestoreModule.enablePersistence(),
        RouterModule.forChild([
            { path: 'speakers', component: SpeakersComponent, data: { title: 'Speakers', depth: 1 }, },
            { path: 'speakers/:id/:seo', component: SpeakersViewComponent, data: { title: false, depth: 2 }, },
            { path: 'schedule', component: ScheduleComponent, data: { title: 'Schedule', depth: 1 }, },
            { path: 'schedule/:id/feedback', component: SessionFeedbackComponent, data: { title: 'Session Feedback', depth: 2 }, },
            { path: 'schedule/:id/:seo', component: SessionViewComponent, data: { title: false, depth: 2 }, },
        ]),
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        SharedModule,

    ],
})
export class MainModule { }
