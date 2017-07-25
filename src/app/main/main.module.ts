import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdIconModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';

import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Declarations
import { TicketsComponent } from './tickets.component';
import { SponsorsComponent } from './sponsors.component';
import { SpeakersComponent } from './speakers.component';
import { ScheduleComponent } from './schedule.component';
import { PastComponent } from './past.component';
import { SessionViewComponent } from './session-view.component';
import { SessionFeedbackComponent } from './session-feedback.component';
import { SpeakersViewComponent } from './speakers-view.component';
import { SpeakerContainerComponent } from './speaker-container.component';
import { SpeakerFullComponent } from './speaker-full.component';
import { UserFeedbackComponent } from './user-feedback.component';
import { StarBarComponent } from './star-bar.component';
import { ScheduleGridComponent } from './schedule-grid.component';
import { SessionDetailsComponent } from './session-details.component';

// Shared Module

import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        TicketsComponent,
        SponsorsComponent,
        SpeakersComponent,
        ScheduleComponent,
        PastComponent,
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
        AngularFireModule.initializeApp({
            apiKey: 'AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg',
            authDomain: 'devfestmn.firebaseapp.com',
            databaseURL: 'https://devfestmn.firebaseio.com',
            storageBucket: 'firebase-devfestmn.appspot.com',
        }),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        RouterModule.forChild([
            { path: 'tickets', component: TicketsComponent, data: { title: 'Tickets' } },
            { path: 'sponsors', component: SponsorsComponent, data: { title: 'Sponsors' } },
            { path: 'past', component: PastComponent, data: { title: 'Past DevFestMN Events' } },
            { path: 'speakers', component: SpeakersComponent, data: { title: 'Speakers', depth: 1 }, },
            { path: 'speakers/:id/:seo', component: SpeakersViewComponent, data: { title: false, depth: 2 }, },
            { path: 'schedule', component: ScheduleComponent, data: { title: 'Schedule', depth: 1 }, },
            { path: 'schedule/:id/feedback', component: SessionFeedbackComponent, data: { title: 'Session Feedback', depth: 2 }, },
            { path: 'schedule/:id/:seo', component: SessionViewComponent, data: { title: false, depth: 2 }, },
            { path: ':year/sponsors', component: SponsorsComponent, data: { title: 'Sponsors' } },
            { path: ':year/speakers', component: SpeakersComponent, data: { title: 'Speakers', depth: 1 }, },
            { path: ':year/speakers/:id/:seo', component: SpeakersViewComponent, data: { title: false, depth: 2 }, },
            { path: ':year/schedule', component: ScheduleComponent, data: { title: 'Schedule', depth: 1 }, },
            { path: ':year/schedule/:id/feedback', component: SessionFeedbackComponent, data: { title: 'Session Feedback', depth: 2 }, },
            { path: ':year/schedule/:id/:seo', component: SessionViewComponent, data: { title: false, depth: 2 }, },
        ]),
        MdIconModule,
        MdButtonModule,
        MdCardModule,
        SharedModule,

    ],
})
export class MainModule { }
