import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'session-details',
    template: `
    <div *ngIf="session" style="">
        
        <div *ngIf="session.track !== 'all'" style="font-size:18px;margin-bottom:24px">{{ session.track}}</div>
        <h1 style="font-size:32px;font-family: Montserrat, sans-serif;">{{session.title}}</h1>
        <div class="speaker-list-container">
            <div *ngFor="let speaker of session.speakers" style="margin:16px 0;">
                <speaker-container [speaker]="speaker | getSpeaker | async"></speaker-container>
            </div>
        </div>
        <div style="margin-bottom:24px;"><span style="font-weight:bold;font-weight:18px;">{{ session.room}}</span> {{ds.customDateFormatter(session.startTime)}}</div>
        <div 
            *ngIf="session.description" 
            [innerHTML]="session.description" style="max-width:500px;display:inline-block;">
        </div>
        <div *ngIf="(auth.uid | async) === false" style="margin-top:64px;">
            <h3>Login for More</h3><p>Login to save this session to your agenda, or to provide feedback after the session ends.</p>
            <button (click)="auth.login()" class="cta" style="display:inline;">Login</button>
        </div>
        
        <div *ngIf="(auth.uid | async)">
            <button *ngIf="!((sessionAgenda | async)?.value)" (click)="addToAgenda()"  class="cta" style="display:inline;">Add to my Agenda</button>
            <button *ngIf="(sessionAgenda | async)?.value" (click)="removeFromAgenda()"  class="cta" style="display:inline;">Remove from my Agenda</button>

            <div *ngIf="(auth.isAdmin | async)">
                <h3 style="margin-top:32px;">Provide Feedback</h3>
                <user-feedback [session]="session"></user-feedback>
            </div>
        </div>
    </div>
    
    `
})
export class SessionDetailsComponent {
    @Input() session;

    sessionAgenda;
    agendaInfo;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService, public auth: AuthService, public af: AngularFire) {

        this.agendaInfo = route.params.switchMap(params => {
            return auth.uid.map(uid =>
                [params['id'], uid]
            );
        });

        this.agendaInfo.subscribe(agendaData => {
            let [session, uid] = agendaData;
            this.sessionAgenda = this.af.database.object(`${ds.FIREPATH}/agendas/${uid}/${session}/`);
        });
    }
            
    addToAgenda() {
        this.sessionAgenda.set({value:true});
    }
    removeFromAgenda() {
        this.sessionAgenda.remove();
    }
}