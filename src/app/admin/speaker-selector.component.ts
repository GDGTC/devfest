import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2018';

@Component({
    selector: 'speaker-selector',
    template: `
        <div *ngFor="let speaker of speakers | async" style="border:1px solid #CCC;padding:16px;">
            <div>
                {{speaker.name}}
                <button type="button" (click)="addSpeakerToSession(speaker)" color="primary">Add Speaker to Session</button>
            </div>
        </div>`
})
export class SpeakerSelector {
    @Input('session') session;
    @Output() addSpeaker = new EventEmitter<string>();
    @Output() removeSpeaker = new EventEmitter<string>();

    speakers;
    schedule;
    currentSession = {};
    currentSpeakers = [];

    constructor(public db: AngularFireDatabase) {
        this.speakers = db.list(PATH + '/speakers', { query: { orderByChild: 'name' } });
        this.schedule = db.list(PATH + '/schedule');
    }
    addSpeakerToSession(speaker) {
            if (this.session.speakers){
                this.currentSpeakers = this.session.speakers;
                console.log(this.currentSpeakers);
            } else {
                this.currentSpeakers = [];
            }
        this.currentSpeakers.push(speaker.$key);
        //this.session.speakerstest.push(speaker.$key);
        this.session.speakers = this.currentSpeakers;
        let key = this.session.$key;

        delete this.session.$key;
        delete this.session.$exists;
        delete this.session.$value;

        this.schedule.update(key, this.session);
        this.session.$key = key;

    }

}
