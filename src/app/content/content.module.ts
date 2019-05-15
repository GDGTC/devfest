import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PastComponent } from './past.component';
import { SpeakerCfpComponent } from './speaker-cfp.component';
import { SponsorsComponent } from './sponsors.component';
import { TicketsComponent } from './tickets.component';

@NgModule({
    declarations: [
        TicketsComponent,
        SponsorsComponent,
        PastComponent,
        SpeakerCfpComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule.forChild([
            { path: 'tickets', component: TicketsComponent, data: { title: 'Tickets' } },
            { path: 'sponsors', component: SponsorsComponent, data: { title: 'Sponsors' } },
            { path: 'past', component: PastComponent, data: { title: 'Past DevFestMN Events' } },
            { path: 'speaker-cfp', component: SpeakerCfpComponent, data: { title: 'Speaker Call for Papers', depth: 1}},
        ]),

    ],
})
export class ContentModule { }
