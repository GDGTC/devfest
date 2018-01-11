import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../shared/data.service';

import 'rxjs/add/operator/switchMap';
import { environment } from '../../environments/environment';
import { YearService } from 'app/year.service';

@Component({
    template: `
    <section>
            <speaker-full [speaker]="speaker | async" [year]="yearService.year"></speaker-full>
    </section>
    `
})
export class SpeakersViewComponent {
    speaker;
    speakerId;
    year;

    constructor(route: ActivatedRoute, ds: DataService, public yearService: YearService) {

        this.speaker = route.params.switchMap(params => {
            return ds.getSpeakers().map(list => list.find(item => item.$key == params['id']))
        });
    }

}
