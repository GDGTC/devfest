import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DataService, Speaker } from '../shared/data.service';



@Component({
    templateUrl: './speaker-edit.component.html',
})
export class SpeakerEditComponent {
    speakerData: Observable<Speaker>;
    year: string;

    constructor(public ds: DataService, public route: ActivatedRoute, public router: Router) {
        this.speakerData =
            route.params.switchMap(params => {
                this.year = params['year'];
                if(params['id'] === 'new') {
                    return Observable.of({});
                }
                return ds.getSpeakers(params['year'])
                    .map(list =>
                        list.find(item =>
                            item.$key === params['id']))
            });
    }

    save(speaker) {
        event.preventDefault();
        this.ds.save(this.year, 'speakers', speaker);
        this.router.navigate(['/', this.year, 'speakers']);

    }

    delete(speaker) {
        if(confirm('Are you sure you want to delete this speaker?')) {
            this.ds.delete(this.year, 'speakers', speaker);
            this.router.navigate(['/', this.year, 'speakers']);
        }
    }


}
