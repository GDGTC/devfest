import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { DataService, FIREPATH } from '../shared/data.service';

import "rxjs/add/operator/switchMap";

@Component({
    template: `
    <section>
            <speaker-full [speaker]="speaker | async"></speaker-full>
    </section>
    `
})
export class SpeakersViewComponent {
    speaker;

    constructor(route: ActivatedRoute, public af: AngularFire) { 
        
        this.speaker = route.params.switchMap(params => 
            af.database.object(FIREPATH + '/speakers/' + params['id'])
        );
    }

}