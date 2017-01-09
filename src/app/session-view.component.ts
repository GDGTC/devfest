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
    <p style="border:1px solid #CCC;margin:32px;padding:32px;">{{(session | async)?.description}}</p>

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