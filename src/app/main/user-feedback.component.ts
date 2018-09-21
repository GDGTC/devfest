import { Component, Input, OnChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { DataService, Session, Feedback } from '../shared/data.service';

import { Subject, combineLatest, empty } from 'rxjs';
import { map, switchMap, tap, filter } from 'rxjs/operators';
import { YearService } from '../year.service';
import { AuthService } from '../realtime-data/auth.service';

@Component({
    selector: 'user-feedback',
    templateUrl: 'user-feedback.component.html',
})
export class UserFeedbackComponent implements OnChanges {
    @Input()
    session;
    feedback: Feedback = { $key: null, speaker: 0, content: 0, recommendation: 0, comment: ' ' };
    editableFeedback: AngularFireObject<any>;
    uid;
    count = 0;

    newSession: Subject<Session> = new Subject();

    constructor(
        public db: AngularFireDatabase,
        public ds: DataService,
        public auth: AuthService,
        public yearService: YearService
    ) {
        let url = combineLatest(this.auth.uid, this.newSession).pipe(
            map(combinedData => {
                let [uid, session] = combinedData;
                if (uid && session && session.$key) {
                    return `/devfest${yearService.year}/feedback/${uid}/${session.$key}/`;
                } else {
                    return null;
                }
            })
        );

        url.pipe(
            tap(path => {
                console.log('fetching data for', path);
            }),
            switchMap(path => (path ? db.object<Feedback>(path).valueChanges() : empty())),
            filter(x => !!x)
        ).subscribe(feedback => {
            console.log('feedback is', feedback);
            this.feedback = feedback;
        });

        url.subscribe(path => {
            if (path) {
                this.editableFeedback = db.object(path);
            }
        });
    }


    ngOnChanges() {
        if (this.session && this.count++ < 10) {
            console.log('nexting newSession');
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
    saveComment(val) {
        this.feedback.comment = val;
        this.save();
    }
    save() {
        console.log(this.feedback);
        if (this.editableFeedback) {
            delete this.feedback.$key;
            this.editableFeedback.set(this.feedback);
        } else {
        }
    }
}
