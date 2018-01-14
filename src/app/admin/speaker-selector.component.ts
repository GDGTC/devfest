import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { YearService } from 'app/year.service';

@Component({
    selector: 'speaker-selector',
    template: `
    <div *ngIf="session.$key">
        <div *ngFor="let speakerSnapshot of speakers | async" style="border:1px solid #CCC;padding:16px;">
            <div>
                {{speakerSnapshot.payload.val().name}}
                <button type="button" (click)="addSpeakerToSession(speakerSnapshot.key)" color="primary">Add Speaker to Session</button>
            </div>
        </div>
    </div>
    <div *ngIf="!session.$key">Save your new session before adding speakers</div>`,
})
export class SpeakerSelector implements OnChanges {
    @Input('session') session;
    @Output() addSpeaker = new EventEmitter<string>();
    @Output() removeSpeaker = new EventEmitter<string>();

    speakers;
    schedule;

    constructor(public db: AngularFireDatabase, public yearService: YearService) {}
    ngOnChanges() {
        let path = `devfest${this.yearService.year}/speakers`;
        console.log('querying ', path);
        this.speakers = this.db.list(path, ref => ref.orderByChild('name')).snapshotChanges();
        this.speakers.subscribe(console.log);
    }

    addSpeakerToSession(speakerKey: string) {
        console.log('Adding', speakerKey, 'to ', this.session);
        let path = `devfest${this.yearService.year}/schedule/${this.session.$key}/speakers`;
        console.log('path is', path);
        const speakerList = this.db.list(path);
        speakerList.push(speakerKey).then(
            () => {
                console.log('Speaker added successfully');
            },
            err => {
                console.error('Error adding speaker to session', err);
            }
        );
    }
}
