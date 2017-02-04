import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AngularFire } from 'angularfire2';

@Component({
    template: `


    `
})
export class SessionNotesComponent {
    sessions;
    sessionNotes = 3;

    constructor(ds: DataService, af: AngularFire) {

    }
}