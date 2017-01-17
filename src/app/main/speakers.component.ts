import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './speakers.component.html',
})
export class SpeakersComponent {

    speakers;

    thisSpeaker = {};
    showDialog = false;

    constructor(public af: AngularFire) {
        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'name'} });
    }

}
