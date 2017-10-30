import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'session-details',
    template: `
    <div *ngIf="session" style="">

        <h1 style="font-size:32px;font-family: Montserrat, sans-serif;margin-bottom:32px;">{{session.title}} <a *ngIf="auth.isAdmin | async" [routerLink]="['/admin',year,'sessions',session.$key,'edit']"><img src="/a/edit.svg"></a></h1>
        <div class="session-details">
            <div>
                <div class="speaker-list-container" style="margin-top:16px;width:325px;">
                    <div *ngFor="let speaker of session.speakers" >
                        <speaker-container [speaker]="speaker | getSpeaker | async"></speaker-container>
                    </div>
                </div>
            </div>
            <div class="session-details-right" style="text-align:left;">
                <div *ngIf="session.track !== 'all'" style="font-weight:bold;margin-bottom:24px;">Track: {{ session.track }}</div>
                <div style="font-weight:bold;margin-bottom:8px;">{{ session.room}}</div>
                <div style="margin-bottom:24px;"> {{ds.customDateFormatter(session.startTime)}}</div>
                <div *ngIf="session.notes" style="margin-bottom:24px;"><strong><em>Note: {{session.notes}}</em></strong></div>
                <div
                    *ngIf="session.description"
                    [innerHTML]="session.description" style="max-width:500px;display:inline-block;">
                </div>
                <div *ngIf="(auth.uid | async) === false" style="margin-top:64px;">
                    <h3>Login for More</h3><p>Login to save this session to your agenda, or to provide feedback after the session ends.</p>
                    <button (click)="auth.login()" class="cta" style="display:inline;">Login</button>
                </div>

                <div *ngIf="(auth.uid | async)">
                    <button *ngIf="!((sessionAgenda | async)?.value)" (click)="addToAgenda()"  class="cta" style="display:inline;">Add to My Agenda</button>
                    <button *ngIf="(sessionAgenda | async)?.value" (click)="removeFromAgenda()"  class="cta" style="display:inline;">Remove from My Agenda</button>

                    <!--<div>
                        <h3 style="margin-top:32px;">Provide Feedback</h3>
                        <user-feedback [session]="session"></user-feedback>
                    </div>-->
                </div>
            </div>
        </div>
    </div>

    `
})
export class SessionDetailsComponent {
    @Input() session;
    @Input() year;

    sessionAgenda: FirebaseObjectObservable<any>;
    agendaInfo;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService, public auth: AuthService, public db: AngularFireDatabase) {

        this.agendaInfo = route.params.switchMap(params => {
            this.year = params['year'];
            return auth.uid.map(uid =>
                [params['id'], uid]
            );
        });

        this.agendaInfo.subscribe(agendaData => {
            let [session, uid] = agendaData;
            this.sessionAgenda = this.ds.getAgenda(this.year, uid, session);
        });
    }

    addToAgenda() {
        this.sessionAgenda.set({ value: true });
    }
    removeFromAgenda() {
        this.sessionAgenda.remove();
    }
}
