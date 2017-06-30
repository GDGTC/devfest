import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { DataService } from '../shared/data.service';



@Component({
    templateUrl: './speakers.component.html',
})
export class SpeakersComponent {

    speakers;

    thisSpeaker = {};
    showDialog = false;

    constructor(public ds: DataService) {
        this.speakers = ds.speakers;
    }

}
