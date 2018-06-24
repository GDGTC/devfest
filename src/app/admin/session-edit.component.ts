
import {of as observableOf,  Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

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
        this.sessionData = route.params.pipe(switchMap(params => {
            if (params['id'] === 'new') {
                return observableOf({ startTime: params['time'], room: params['room'] });
            }
            return ds.getSchedule().pipe(map(list => list.find(item => item.$key === params['id'])));
        }));
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
