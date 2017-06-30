import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '../shared/data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    templateUrl: './session-view.component.html',
})
export class SessionViewComponent {
    session;

    constructor(route: ActivatedRoute, public ds: DataService, title: Title) {
        this.session = route.params.switchMap(params => {
            return ds.sessionList.map(list =>
                list.find(item =>
                    item.$key == params['id']
                )
            )

        });

        this.session.subscribe(sessionData => {
            if(sessionData) {
                title.setTitle(sessionData.title + ' | DevFestMN 2017');
            }
        });


    }

}
