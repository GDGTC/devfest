import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './speakers.component.html',
    styleUrls: ['./shared/styles.css']
})
export class SpeakersComponent {

    speakers;

    constructor(public af: AngularFire) {
        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'confirmed', equalTo: true } });
    }

}