import { Component } from '@angular/core';
import { Speaker } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './speakers.component.html'
})
export class SpeakersComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    speakers;

    editSpeaker = null;

    showDialog = false;

    constructor(public af: AngularFire, public auth: AuthService) {
        this.uid = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.uid;
            } else {
                return null;
            }
        });
        this.name = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.displayName;
            } else {
                return null;
            }
        });
        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'name' } });
    }
    login() {
        this.af.auth.login();
    }
    saveSpeaker(speaker) {
        event.preventDefault();
        if (speaker.$key) {
            let key = speaker.$key;

            delete speaker.$key;
            delete speaker.$exists;
            delete speaker.$value;

            this.speakers.update(key, speaker);
        } else {
            this.speakers.push(speaker);
        }
        this.editSpeaker = {};
        this.showDialog = false;
    }
    deleteSpeaker(key){
        this.speakers.remove(key);
    }

    clearEditSpeaker() {
        this.editSpeaker = {};
    }

}