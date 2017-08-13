import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import { environment } from '../../environments/environment';


@Component({
    templateUrl: './speakers.component.html',
})
export class SpeakersComponent {

    speakers;

    thisSpeaker = {};
    showDialog = false;

    year: string;

    constructor(public ds: DataService, route: ActivatedRoute, public router: Router, public auth: AuthService) {
        this.speakers = route.params.switchMap(params => {
            this.year = params['year'] || environment.defaultYear;
            return ds.getSpeakers(params['year'])
        });

    }

    addSpeaker() {
        this.router.navigate(['/admin',this.year,'speakers','new','edit']);
    }

}
