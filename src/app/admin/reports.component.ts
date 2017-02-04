import { Component } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';
import { AngularFire } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
    template: `
<div *ngIf="auth.isAdmin | async">
    <h2>Speaker</h2>
    <div *ngFor="let session of sessions | async">
        <div><strong>{{ session.title}}</strong></div>
        <div *ngIf="session.feedback">{{session.feedback.length}} Reviews
            <div>Speaker: {{ session.scoreSpeaker }} / 
            Content: {{ session.scoreContent }} / 
            Recommendation: {{ session.scoreRecommendation }}</div>
            <table border="1">
                <tr><td>S</td><td>C</td><td>R</td></tr>
                <tr *ngFor="let feedback of session.feedback">
                    <td>{{feedback.speaker}}</td>
                    <td>{{feedback.content}}</td>
                    <td>{{feedback.recommendation}}</td>
                </tr>
            </table>
        </div>
        <br/>

    </div>

    <h2>Overall Feedback</h2>
    <ol>
        <div *ngFor="let session of sessions | async">
            <div *ngFor="let feedback of session.feedback">
            
                <li>{{feedback.speaker}} / {{feedback.content}} / {{feedback.recommendation}} - {{feedback.uid}}</li>
            </div>
        </div>
    </ol>
</div>
    `
})
export class ReportsComponent {
    feedback: Observable<any>;
    sessions: Observable<{title: string, scoreSpeaker: number, scoreContent: number, scoreRecommendation: number, feedback?: any[]}[]>;

    constructor(public auth: AuthService, public af: AngularFire, public ds: DataService) {
        this.feedback = af.database.object(ds.FIREPATH + '/feedback');
        this.sessions = Observable.combineLatest(this.feedback, ds.sessionList)
        .map(data => {
            let [feedback, originalSession] = data;

            // clone the data
            let sessions = JSON.parse(JSON.stringify(originalSession));

            delete feedback.$key;
            delete feedback.$exists;
            delete feedback.$value;

            // Add feedback
            for(let uid in feedback) {
                //console.log("processing user",uid);
                let user = feedback[uid];
                for(let sessionKey in user) {
                    let session = sessions.find(item => item.$key == sessionKey);
                    //console.log(session);


                    if(!Array.isArray(session.feedback)) {
                        session.feedback = [];
                    }
                    user[sessionKey].uid = uid;
                    session.feedback.push(user[sessionKey]);

                }

            }


            // Summarize feedback
            for(let session of sessions) {
                session.scoreSpeaker = session.scoreContent = session.scoreRecommendation = 0;
                if(session.feedback) {
                    let length = session.feedback.length;
                    for(let feedback of session.feedback) {
                        
                        if(feedback.speaker == 0 || feedback.content == 0 || feedback.recommendation == 0) {
                            length--; 
                        } else {
                            session.scoreSpeaker += feedback.speaker;
                            session.scoreContent += feedback.content;
                            session.scoreRecommendation += feedback.recommendation;
                        }
                    }
                    session.scoreSpeaker = session.scoreSpeaker / session.feedback.length;
                    session.scoreContent = session.scoreContent / session.feedback.length;
                    session.scoreRecommendation = session.scoreRecommendation / session.feedback.length;
                }
            }

            // Sort Feedback
            sessions = sessions.sort((a, b) => {
                return a.scoreSpeaker + a.scoreContent + a.scoreRecommendation > b.scoreSpeaker + b.scoreContent + b.scoreRecommendation ?
                    -1 : 1
            })
        
            return sessions;
        });
        


    }
}