import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { TicketsComponent } from './tickets.component';
import { SponsorsComponent } from './sponsors.component';
import { PastComponent } from './past.component';
import { SpeakerCfpComponent } from './speaker-cfp.component';

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