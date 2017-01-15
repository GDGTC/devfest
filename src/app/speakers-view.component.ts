import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire } from 'angularfire2';

import { DataService, FIREPATH } from './shared/data.service';

import "rxjs/add/operator/switchMap";

@Component({
    template: `
<section style="padding-top:150px;">
        <div class="callout">{{(thisSpeaker | async)?.name}} </div>
        <div style="display: flex;align-items: center;justify-content: center;">
            <div class="" [style.background-image]="'url('+(thisSpeaker | async)?.imageUrl+')'" style="background-size: cover; width: 125px; height: 125px;border-radius: 50%"></div>
        </div>
        <div>{{(thisSpeaker | async)?.company}}</div>
        <div *ngIf="(thisSpeaker | async)?.twitter"><a href="https://twitter.com/{{(thisSpeaker | async)?.twitter}}" target="_new">@{{(thisSpeaker | async)?.twitter}}</a></div>
        <div style="border:1px solid #CCC;margin:32px;padding:32px;" [innerHTML]="(thisSpeaker | async)?.bio"></div>
</section>
    `
})
export class SpeakersViewComponent {
    thisSpeaker;
    anid;

    constructor(router: Router, route: ActivatedRoute, public af: AngularFire) { 
        this.thisSpeaker = af.database.object(FIREPATH + '/speakers/' + route.snapshot.params['id']);
        document.body.scrollTop = 0;
    }

}