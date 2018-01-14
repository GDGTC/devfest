import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { DataService, Session, Speaker } from '../shared/data.service';
import { YearService } from 'app/year.service';

@Component({
    templateUrl: './session-edit.component.html',
})
export class SessionEditComponent {
    sessionData: Observable<Session>;
    year: string;

    constructor(
        public ds: DataService,
        public route: ActivatedRoute,
        public router: Router,
        public yearService: YearService
    ) {
        this.sessionData = route.params.switchMap(params => {
            if (params['id'] === 'new') {
                return Observable.of({ startTime: params['time'], room: params['room'] });
            }
            return ds.getSchedule().map(list => list.find(item => item.$key === params['id']));
        });
    }

    save(session) {
        event.preventDefault();
        this.ds.save('schedule', session);
        this.router.navigate(['/', this.yearService.year, 'schedule']);
    }

    delete(session) {
        this.ds.delete('schedule', session);
        this.router.navigate(['/', this.yearService.year, 'schedule']);
    }

    deleteSpeakerFromSession(session: Session, speakerKey: string) {
       this.ds.deleteSpeakerFromSession(session, speakerKey);
    }
    getValues(obj) {
        return Object.keys(obj).map(key => obj[key]);
    }
}
