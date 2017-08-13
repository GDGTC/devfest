import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DataService, Session, Speaker } from '../shared/data.service';



@Component({
    templateUrl: './session-edit.component.html',
})
export class SessionEditComponent {
    sessionData: Observable<Session>;
    year: string;

    constructor(public ds: DataService, public route: ActivatedRoute, public router: Router) {
        this.sessionData =
            route.params.switchMap(params => {
                this.year = params['year'];

                if(params['id'] === 'new') {
                    return Observable.of({startTime: params['time'], room: params['room']});
                }
                return ds.getSchedule(params['year'])
                    .map(list =>
                        list.find(item =>
                            item.$key === params['id']))
            });
    }

    save(session) {
        event.preventDefault();
        this.ds.save(this.year, 'schedule', session);
        this.router.navigate(['/', this.year, 'schedule']);

    }

    delete(session) {
        this.ds.delete(this.year, 'schedule', session);
        this.router.navigate(['/', this.year, 'schedule']);
    }


}
