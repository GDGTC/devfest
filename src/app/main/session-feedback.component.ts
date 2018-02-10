import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { DataService } from '../shared/data.service';
import { OurMeta } from 'app/our-meta.service';

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

    constructor(
        route: ActivatedRoute,
        public ds: DataService,
        public meta: OurMeta
    ) {
        this.session = route.params.pipe(switchMap(params => {
            return ds.getSchedule().map(list => list.find(item => item.$key === params['id']));
        }));

        this.session.subscribe(sessionData => {
            meta.setTitle('Feedback on ' + sessionData.title);
        });
    }
}
