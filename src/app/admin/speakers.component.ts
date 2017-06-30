import { Component } from '@angular/core';
import { Speaker } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';

const PATH = 'devfest2017'

@Component({
    templateUrl: './speakers.component.html'
})
export class SpeakersComponent {
    uid: Observable<string>;
    name: Observable<string>;

    speakers;

    editSpeaker = null;

    showDialog = false;

    constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, public authService: AuthService) {
        this.uid = auth.authState.map(authState => {
            if (authState) {
                return authState.uid;
            } else {
                return null;
            }
        });
        this.name = auth.authState.map(authState => {
            if (authState) {
                return authState.displayName;
            } else {
                return null;
            }
        });
        this.speakers = db.list(PATH + '/speakers', { query: { orderByChild: 'name' } });
    }
    login() {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
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
