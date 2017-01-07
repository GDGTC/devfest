import { Component, Pipe } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from './shared/firebase.service';

import { Observable } from 'rxjs/Observable';
import "./shared/shareResults";

import { MdRipple } from '@angular/material/core/core';

const PATH = 'devfest2017'

export interface Session {
    $key: string;
    room: string;
    startTime: string;
    title: string;
    track: string;
}

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['./shared/styles.css'],
    providers: [FirebaseService],
})
export class ScheduleComponent {

    schedule: Observable<Session[]>;
    times;
    timeSlots: Observable<any>;

    constructor(public af: AngularFire) {

        this.schedule = (<Observable<Session[]>>af.database.list(PATH + '/schedule', { query: { orderByChild: 'title' } }))
            .shareResults();
        this.times = af.database.list(PATH + "/scheduletimes");

        this.timeSlots = this.schedule
        // Invert the array to be time-indexed.
        .map(list => {
            let times = {};
            for (let session of list) {
                let index = session.startTime;
                if(Array.isArray(times[index])) {
                    times[index].push(session);
                } else {
                    times[index] = [session];
                }
                
            }
            let sortedSlots = Object.keys(times).sort();
            return {slots: sortedSlots, sessions: times};
        }).shareResults();
            
    }

    updateTrack(trackName) {

    }

    /**
     * Takes in an ISO 8601 datetime string
     * returns a friendly time e.g. "8 PM" in Minnesota Time
     */
    customDateFormatter(isoDateTime) {
        let dateTime = new Date(isoDateTime);
        let time = dateTime.getHours();
        time -= (6 - dateTime.getTimezoneOffset()/60)
        let indicator = "AM";
        if(time > 12) {
            time -= 12;
            indicator = "PM";
        }
        return `${time} ${indicator}`;

    }

}