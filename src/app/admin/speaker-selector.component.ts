import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

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

    constructor(public af: AngularFire) {
        this.speakers = af.database
            .list(PATH + '/speakers',{ query: { orderByChild: 'name' } })
            .map(items => items.sort((a, b) => a.name - b.name)) as Observable<any[]>;
        //console.log('SpeakerSelector constructor');
        this.schedule = af.database.list(PATH + '/schedule');
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