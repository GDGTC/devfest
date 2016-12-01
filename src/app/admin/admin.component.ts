import { Component } from '@angular/core';

import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    template: `
<div style="padding:16px;pading-top:60px;">
    <h1>Admin DevFestMN</h1>
    <div *ngIf="(this.uid | async) === null">
        <button type="button" (click)="af.auth.login()">Login</button>
    </div>
    <div *ngIf="(this.uid | async) !== null">
        Welcome {{name | async}} ({{uid | async}})
        <h2>Schedule</h2>
        <div *ngFor="let session of schedule | async" style="border:1px solid #CCC;padding:16px;">
            <div>{{session.title}}</div>
            <div>{{session.description}}</div>
            <div>{{session.room}}</div>
            <div>{{session.endTime}}</div>
            <div>{{session.startTime}}</div>
            <div>{{session.category}}</div>
            <div>{{session.all}}</div>
            <div>{{session.slidesUrl}}</div>
            <div>{{session.videoUrl}}</div>
            <div>{{session.speakers | json}}</div>
            <button (click)="editSession = session">Edit</button>
        </div>
        <h3>New Session</h3>
        <form ngNoForm (submit)="saveSession(editSession)">
            <md-input [(ngModel)]="editSession.title" placeholder="Title"></md-input>
            <md-input [(ngModel)]="editSession.description" placeholder="Description"></md-input>
            <md-input [(ngModel)]="editSession.room" placeholder="Room"></md-input>
            <md-input [(ngModel)]="editSession.startTime" placeholder="Start Time"></md-input>
            <button type="submit" *ngIf="!editSession.$key">Create Session</button>
            <button type="submit" *ngIf="editSession.$key">Save Session</button>
        </form>


        <h2>Speakers</h2>
        <h3>New Speaker</h3>
        <div *ngFor="let speaker of speakers | async" style="border:1px solid #CCC;padding:16px;">
            <div>{{speaker.name}}</div>
            <div>{{speaker.bio}}</div>
            <div>{{speaker.company}}</div>
            <div>@{{speaker.twitter}}</div>
            <div>{{speaker.imageUrl}}</div>
            <div>{{speaker.website}}</div>
            <button (click)="editSpeaker = speaker">Edit</button>
            <button (click)="deleteSpeaker(speaker.$key)" md-raised-button color="primary">Delete</button>
        </div>
        <form ngNoForm (submit)="saveSpeaker(editSpeaker)">
            <md-input [(ngModel)]="editSpeaker.name" placeholder="Name"></md-input>
            <md-input [(ngModel)]="editSpeaker.bio" placeholder="Bio"></md-input>
            <md-input [(ngModel)]="editSpeaker.company" placeholder="Company"></md-input>
            <md-input [(ngModel)]="editSpeaker.twitter" placeholder="Twitter">
                <span md-prefix>@</span>
            </md-input>
            <md-input [(ngModel)]="editSpeaker.imageUrl" placeholder="Image URL"></md-input>
            <md-input [(ngModel)]="editSpeaker.website" placeholder="Website"></md-input>
            <button type="submit" *ngIf="editSpeaker.$key">Save Speaker</button>
            <button type="submit" *ngIf="!editSpeaker.$key">Create Speaker</button>
        </form>

    </div>
</div>
   
    `
})
export class AdminComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    schedule;
    speakers;

    editSession = {};
    editSpeaker = {};

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
        this.schedule = af.database.list(PATH + '/schedule');
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

}