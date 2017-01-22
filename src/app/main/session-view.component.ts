import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFire } from 'angularfire2';

import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
    template: `
<section style="padding-top:150px;">
    <div class="callout">{{(session | async)?.title}}</div>
    <div>{{ds.customDateFormatter((session | async)?.startTime)}}</div>
    <div>{{ (session | async)?.room}}</div>
    <div *ngIf="(session | async)?.track !== 'all'">{{ (session | async)?.track}} Track</div>
    <div class="speaker-list-container">
        <div *ngFor="let speaker of (session | async)?.speakers">
            <speaker-container [speaker]="speaker | fireJoin: '/devfest2017/speakers/' | async"></speaker-container>
        </div>
    </div>
    <div style="border:1px solid #CCC;margin:32px;padding:32px;" [innerHTML]="(session | async)?.description" *ngIf="(session | async)?.description"></div>
    <div *ngIf="auth.uid | async">

        <button *ngIf="!((sessionAgenda | async)?.value)" (click)="addToAgenda()">Add to my Agenda</button>
        <button *ngIf="(sessionAgenda | async)?.value" (click)="removeFromAgenda()">Remove from my Agenda</button>
    </div>
</section>
    `
})
export class SessionViewComponent {
    session;

    sessionAgenda;
    agendaInfo;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService, public auth: AuthService, public af: AngularFire, title: Title) {
        this.session = route.params.switchMap(params => {
            return ds.sessionList.map(list =>
                list.find(item =>
                    item.$key == params['id']
                )
            )

        });

        this.session.subscribe(sessionData => {
             title.setTitle(sessionData.title + ' | DevFestMN 2017');
        });

        this.agendaInfo = route.params.switchMap(params => {
            return auth.uid.map(uid => 
                [params['id'], uid]
            );
        });

        this.agendaInfo.subscribe(agendaData => {
            let [session, uid] = agendaData;
            this.sessionAgenda = this.af.database.object(`/devfest2017/agendas/${uid}/${session}/`);
        });

    }
        
    addToAgenda() {
        this.sessionAgenda.set({value:true});
    }
    removeFromAgenda() {
        this.sessionAgenda.remove();
    }
}