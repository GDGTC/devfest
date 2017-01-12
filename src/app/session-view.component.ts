import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from './shared/data.service';

import "rxjs/add/operator/switchMap";

@Component({
    template: `
<section style="padding-top:150px;">
    <div class="callout">{{(session | async)?.title}}</div>
    <div>{{ds.customDateFormatter((session | async)?.startTime)}}</div>
    <div>{{ (session | async)?.room}}</div>
    <div *ngIf="(session | async)?.track !== 'all'">{{ (session | async)?.track}} Track</div>
    <div class="speaker-list-container">
        <div *ngFor="let speaker of (session | async)?.speakers"  [hidden]="!speaker.confirmed" class="speaker-card">
            <div class="speaker-card-img" [style.background-image]="'url('+(speaker | fireJoin: '/devfest2017/speakers/' | async)?.imageUrl+')'" style="background-size: cover; width: 70px; height: 70px;"></div>
            <div class="speaker-content">
                <h2>{{(speaker | fireJoin:'/devfest2017/speakers/' | async)?.name}}</h2>
                <div>{{(speaker | fireJoin:'/devfest2017/speakers/' | async)?.company}}</div>
                <div [hidden]="!(speaker | fireJoin:'/devfest2017/speakers/' | async)?.twitter"><a href="https://twitter.com/{{(speaker | fireJoin:'/devfest2017/speakers/' | async)?.twitter}}" target="_new">@{{(speaker | fireJoin:'/devfest2017/speakers/' | async)?.twitter}}</a></div>
            </div>
        </div>
    </div>
    <div style="border:1px solid #CCC;margin:32px;padding:32px;" [innerHTML]="(session | async)?.description"></div>

</section>
    `
})
export class SessionViewComponent {
    session;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService) {
        this.session = route.params.switchMap(params =>
            ds.sessionList.map(list => 
                list.find(item =>
                    item.$key == params['id']
                )
            )
        );
    }

}