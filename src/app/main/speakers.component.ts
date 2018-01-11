import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

import { environment } from '../../environments/environment';
import { YearService } from 'app/year.service';

@Component({
    templateUrl: './speakers.component.html',
})
export class SpeakersComponent {
    speakers;

    thisSpeaker = {};
    showDialog = false;

    year: string;

    constructor(public ds: DataService, route: ActivatedRoute, public router: Router, public auth: AuthService, public yearService: YearService) {
        this.speakers = ds.getSpeakers();
    }

    addSpeaker() {
        this.router.navigate(['/admin', this.yearService.year, 'speakers', 'new', 'edit']);
    }
}
