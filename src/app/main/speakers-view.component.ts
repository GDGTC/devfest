import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../shared/data.service';

import { switchMap, map } from 'rxjs/operators';

import { YearService } from '../year.service';

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

        this.speaker = route.params.pipe(switchMap(params => {
            return ds.getSpeakers(this.yearService.year).pipe(map(list => list.find(item => item.$key === params['id'])));
        }));
    }

}
