import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ScheduleGridComponent } from './schedule-grid.component';
import { ScheduleComponent } from './schedule.component';
import { SessionDetailsComponent } from './session-details.component';
import { SessionFeedbackComponent } from './session-feedback.component';
import { SessionViewComponent } from './session-view.component';
import { SpeakerContainerComponent } from './speaker-container.component';
import { SpeakerFullComponent } from './speaker-full.component';
import { SpeakersViewComponent } from './speakers-view.component';
import { SpeakersComponent } from './speakers.component';
import { StarBarComponent } from './star-bar.component';
import { UserFeedbackComponent } from './user-feedback.component';
import { RealtimeDataModule } from '../realtime-data/realtime-data.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
        RealtimeDataModule,
        AngularFireDatabaseModule,
        FormsModule,
        HttpModule,
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
