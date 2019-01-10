import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DataService, Session } from '../shared/data.service';

import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { YearService } from '../year.service';
import { AuthService } from '../realtime-data/auth.service';

export interface Schedule {
    startTimes: any[];
    gridData: any;
    rooms: any[];
}

@Component({
    templateUrl: './sessions.component.html',
})
export class SessionsComponent {
    sessions;

    thisSession = {};
    showDialog = false;

    year: string;

    constructor(
        public ds: DataService,
        public router: Router,
        public auth: AuthService,
        public yearService: YearService
    ) {
        this.sessions = ds.getSchedule(yearService.year);
    }
}
