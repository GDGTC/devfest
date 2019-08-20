import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { PastComponent } from './past.component';
import { SpeakerCfpComponent } from './speaker-cfp.component';
import { SponsorsComponent } from './sponsors.component';
import { TicketsComponent } from './tickets.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';

@NgModule({
    declarations: [
        TicketsComponent,
        SponsorsComponent,
        PastComponent,
        SpeakerCfpComponent,
        CodeOfConductComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule.forChild([
            { path: 'tickets', component: TicketsComponent, data: { title: 'Tickets' } },
            { path: 'sponsors', component: SponsorsComponent, data: { title: 'Sponsors' } },
            { path: 'past', component: PastComponent, data: { title: 'Past DevFestMN Events' } },
            { path: 'speaker-cfp', component: SpeakerCfpComponent, data: { title: 'Speaker Call for Papers', depth: 1}},
            { path: 'conduct', component: CodeOfConductComponent, data: { title: 'Code of Conduct'}},
        ]),

    ],
})
export class ContentModule { }
