import { Component, Input, OnChanges } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { DataService, Session } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { empty } from 'rxjs/observable/empty';
import { YearService } from '../year.service';

@Component({
    selector: 'user-feedback',
    template: `
    <div *ngIf="auth.uid | async">
        <div>How would you rate this speaker?</div>
        <star-bar (newSelection)="saveSpeaker($event)" [selected]="feedback.speaker"></star-bar>
        <div>How would you rate the content?</div>
        <star-bar (newSelection)="saveContent($event)" [selected]="feedback.content"></star-bar>
        <div>Would you recommend this session?</div>
        <star-bar (newSelection)="saveRecommendation($event)" [selected]="feedback.recommendation"></star-bar>
        <div>Comments</div>
        <input #feedbackComment (blur)='saveComment(feedbackComment.value)' value='{{feedback.comment}}'>
        <input type="submit" ng-click="save()" value="save">
    </div>
    <div *ngIf="(auth.uid | async) === false">
        <button (click)="auth.login()" mat-raised-button color="primary">Login to provide feedback</button>
    </div>
    `,
})
export class UserFeedbackComponent implements OnChanges {
    @Input() session;
    feedback: any = { speaker: 0, content: 0, recommendation: 0, comment : " " };
    editableFeedback;
    uid;

    newSession: Subject<Session> = new Subject();

    constructor(
        public db: AngularFireDatabase,
        public ds: DataService,
        public auth: AuthService,
        public yearService: YearService
    ) {
        let url = combineLatest(this.auth.uid, this.newSession).pipe(map(combinedData => {
            let [uid, session] = combinedData;
            if (uid && session && session.$key) {
                return `/devfest${yearService.year}/feedback/${uid}/${session.$key}/`;
            } else {
                return null;
            }
        }));

        url.pipe(switchMap(url => (url ? db.object(url) : empty()))).subscribe(feedback => {
            this.feedback = feedback;
        });

        url.subscribe(url => {
            if (url) {
                this.editableFeedback = db.object(url);
            }
        });
    }

    ngOnChanges() {
        if (this.session) {
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
    saveComment(val){
        this.feedback.comment = val;
        this.save();
    }
    save() {
        console.log(this.feedback);
        if (this.editableFeedback) {
            delete this.feedback.$key;
            delete this.feedback.$exists;
            delete this.feedback.$value;
            this.editableFeedback.set(this.feedback);
        } else {
        }
    }
}
