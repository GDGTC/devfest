import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/data.service';
import { ActivatedRoute } from '@angular/router';



@Component({
    templateUrl: './speakers.component.html',
})
export class SpeakersComponent {

    speakers;

    thisSpeaker = {};
    showDialog = false;

    constructor(public ds: DataService, route: ActivatedRoute) {
        this.speakers = route.params.switchMap(params => ds.getSpeakers(params['year']));
    }

}
