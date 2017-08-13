import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../shared/data.service';

import 'rxjs/add/operator/switchMap';
import { environment } from '../../environments/environment';

@Component({
    template: `
    <section>
            <speaker-full [speaker]="speaker | async" [year]="year"></speaker-full>
    </section>
    `
})
export class SpeakersViewComponent {
    speaker;
    speakerId;
    year;

    constructor(route: ActivatedRoute, ds: DataService) {

        this.speaker = route.params.switchMap(params => {
            this.year = params['year'] || environment.defaultYear;
            console.log('year is',this.year);
            return ds.getSpeakers(params['year']).map(list => list.find(item => item.$key == params['id']))
        });
    }

}
