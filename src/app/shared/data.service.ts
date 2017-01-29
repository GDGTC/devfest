import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import './shareResults';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';


export interface Session {
    $key: string;
    room: string;
    startTime: string;
    title: string;
    description: string;
    track: string;
    speakers: any[];
}

export interface Speaker {
    $key: string;
    name: string;
    bio: string;
    confirmed: boolean;
    company: string;
    twitter: string;
    imageUrl: string;
    website: string;
}

export const FIREPATH = 'devfest2017'

@Injectable()
export class DataService {
    sessionList;
    timeSlots;
    speakers: Observable<Speaker[]>;


    constructor(public af: AngularFire) {
        this.sessionList = (<Observable<Session[]>>af.database.list(FIREPATH + '/schedule', { query: { orderByChild: 'title' } }));
        this.sessionList.subscribe(next => {
            localStorage.setItem("sessionsCache", JSON.stringify(next));
        });

        this.sessionList = this.sessionList
            .startWith(JSON.parse(localStorage.getItem('sessionsCache')))
            .filter(x => !!x)
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


        let scheduleCache = localStorage.getItem("scheduleCache");
        this.timeSlots = this.timeSlots
            .startWith(JSON.parse(scheduleCache))
            .filter(x => !!x)
            .shareResults();


        this.speakers = af.database.list(FIREPATH + '/speakers', { query: { orderByChild: 'name'} });
        this.speakers.subscribe(next => {
            localStorage.setItem("speakerCache", JSON.stringify(next));
        })
        let speakerCache = localStorage.getItem("speakerCache");
        this.speakers = this.speakers
            .startWith(JSON.parse(speakerCache))
            .filter(x => !!x)
            .shareResults();

    }


    /**
     * Takes in an ISO 8601 datetime string
     * returns a friendly time e.g. "8 PM" in Minnesota Time
     */
    customDateFormatter(isoDateTime) {
        let dateTime = new Date(isoDateTime);
        let time = dateTime.getHours();
        time -= (6 - dateTime.getTimezoneOffset() / 60)
        let indicator = (time >= 12 && time < 24) ? "PM" : "AM";
        if (time > 12) {
            time -= 12;
        }
        return `${time} ${indicator}`;

    }
}