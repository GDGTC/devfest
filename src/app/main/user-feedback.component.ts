import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { DataService, Session } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/empty';

@Component({
    selector: 'user-feedback',
    template: `
    <div *ngIf="auth.uid | async">
        <div>How would you rate this speaker?</div>
        <star-bar (newSelection)="saveSpeaker($event)" [selected]="feedback.speaker"></star-bar>
        <div>how would you rate the content?</div>
        <star-bar (newSelection)="saveContent($event)" [selected]="feedback.content"></star-bar>
        <div>Would you recommend this session</div>
        <star-bar (newSelection)="saveRecommendation($event)" [selected]="feedback.recommendation"></star-bar>
    </div>
    <div *ngIf="(auth.uid | async) === false">
        <button (click)="auth.login()" mat-raised-button color="primary">Login to provide feedback</button>
    </div>
    `,
})
export class UserFeedbackComponent {
    @Input() session;
    feedback: any = {speaker: 0, content: 0, recommendation: 0};
    editableFeedback;
    uid;

    newSession: Subject<Session> = new Subject();

    constructor(public db: AngularFireDatabase, public ds: DataService, public auth: AuthService) {
        let url = Observable.combineLatest(this.auth.uid, this.newSession)
        .map(combinedData => {
            let [uid, session] = combinedData;
            if(uid && session && session.$key) {
                return `/devfest2017/feedback/${uid}/${session.$key}/`;
            } else {
                return null;
            }
        });

        url.switchMap(url => url ?db.object(url) : Observable.empty())
        .subscribe(feedback => {
            this.feedback = feedback;
        });

        url
        .subscribe(url => {
            if(url) {
                this.editableFeedback = db.object(url);
            }
        });

    }

    ngOnChanges() {
        if(this.session) {
            this.newSession.next(this.session);
        }
    }
    saveSpeaker(val) {
        this.feedback.speaker = val;
        this.save();
    }
    saveContent(val) {
        this.feedback.content = val;
        this.save();
    }
    saveRecommendation(val) {
        this.feedback.recommendation = val;
        this.save();
    }
    save() {
        if(this.editableFeedback) {
            delete this.feedback.$key;
            delete this.feedback.$exists;
            delete this.feedback.$value;
            this.editableFeedback.set(this.feedback);
        } else {
        }
    }
}
