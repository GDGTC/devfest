import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: 'schedule.component.html'
})
export class ScheduleComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    schedule;
    speakers;

    editSession = {};
    editSpeaker = {};

    showDialog = false;

    constructor(public af: AngularFire) {
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
        this.schedule = af.database
            .list(PATH + '/schedule')
            .map(items => items.sort((a, b) => a.startTime - b.startTime)) as Observable<any[]>
        ;
        this.speakers = af.database.list(PATH + '/speakers');
    }
    login() {
        this.af.auth.login();
    }
    saveSession(session) {
        event.preventDefault();
        if (session.$key) {
            let key = session.$key;

            delete session.$key;
            delete session.$exists;
            delete session.$value;

            this.schedule.update(key, session);
        } else {
            this.schedule.push(session);
        }
        this.editSession = {};
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
    }
    deleteSpeaker(key){
        this.speakers.remove(key);
    }
    deleteSession(key){
        this.schedule.remove(key);
    }

}