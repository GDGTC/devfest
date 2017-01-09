import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import "./shareResults";
import "rxjs/add/operator/startWith";


export interface Session {
    $key: string;
    room: string;
    startTime: string;
    title: string;
    track: string;
}

export const FIREPATH = 'devfest2017'

@Injectable()
export class DataService {
    sessionList;
    timeSlots;

    constructor(public af: AngularFire) {
        this.sessionList = (<Observable<Session[]>>af.database.list(FIREPATH + '/schedule', { query: { orderByChild: 'title' } }))
            .shareResults();

        this.timeSlots = this.sessionList
            // Invert the array to be time-indexed.
            .map(list => {
                let times = {};
                for (let session of list) {
                    let index = session.startTime;
                    if (Array.isArray(times[index])) {
                        times[index].push(session);
                    } else {
                        times[index] = [session];
                    }

                }
                delete times['UNK'];
                let sortedSlots = Object.keys(times).sort();
                return { slots: sortedSlots, sessions: times };
            });

        // Local Cache
        this.timeSlots.subscribe(next => {
            localStorage.setItem("scheduleCache", JSON.stringify(next));
        });

        this.timeSlots = this.timeSlots
            .startWith(localStorage.getItem("scheduleCache"))
            .shareResults();
    }
}