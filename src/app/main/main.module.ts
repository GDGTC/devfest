import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdIconModule } from '@angular/material/icon';
import { MdButtonModule } from '@angular/material/button';
import { MdCardModule } from '@angular/material/card';

import 'hammerjs';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

// Declarations
import { HomeComponent } from './home.component';
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
        HomeComponent,
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
            apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
            authDomain: "devfestmn.firebaseapp.com",
            databaseURL: "https://devfestmn.firebaseio.com",
            storageBucket: "firebase-devfestmn.appspot.com",
        }, { method: AuthMethods.Popup, provider: AuthProviders.Google }),
        RouterModule.forChild([
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'tickets',
                component: TicketsComponent,
                data: { title: 'Tickets' },
            },
            {
                path: 'sponsors',
                component: SponsorsComponent,
                data: { title: 'Sponsors' },
            },
            {
                path: 'past',
                component: PastComponent,
                data: { title: 'Past DevFestMN Events' },
            },
            {
                path: 'speakers',
                component: SpeakersComponent,
                data: { title: 'Speakers' },
            },
            {
                path: 'speakers/:id/:seo',
                component: SpeakersViewComponent,
                data: { title: false },
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                data: { title: 'Schedule' },
            },
            {
                path: 'schedule/:id/feedback',
                component: SessionFeedbackComponent,
                data: { title: 'Session Feedback' },
            },
            {
                path: 'schedule/:id/:seo',
                component: SessionViewComponent,
                data: { title: false },
            },
        ]),
        MdIconModule.forRoot(),
        MdButtonModule.forRoot(),
        MdCardModule.forRoot(),
        SharedModule,

    ],
    providers: [
    ],
})
export class MainModule { }