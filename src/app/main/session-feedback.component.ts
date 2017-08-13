import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
    template: `
    <section>

        <div class="callout">{{(session  |async)?.title}}</div>
        <user-feedback [session]="session | async"></user-feedback>
    </section>
    `,
})
export class SessionFeedbackComponent {
    session;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService, public auth: AuthService, title: Title) {
        this.session = route.params.switchMap(params => {
            return ds.getSchedule().map(list =>
                list.find(item =>
                    item.$key == params['id']
                )
            )

        });

        this.session.subscribe(sessionData => {
             title.setTitle('Feedback on ' + sessionData.title + ' | DevFestMN 2017');
        });
    }
}
