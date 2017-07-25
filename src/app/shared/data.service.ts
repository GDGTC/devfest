import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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
    blocks?: number;
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


@Injectable()
export class DataService {
    ROOMS = ['Large Auditorium', 'Small Auditorium', 'Lab', 'Classroom A', 'Classroom B', 'Classroom C', 'Classroom D'];
    FLOORS = { 'Large Auditorium': 1, 'Small Auditorium': 1, 'Lab': 3, 'Classroom A': 3, 'Classroom B': 3, 'Classroom C': 3, 'Classroom D': 3 };

    FIREPATH = 'devfest2017';
    defaultYear = '2017';


    constructor(public db: AngularFireDatabase) {

    }

    getSchedule(year?: string): Observable<Session[]> {
        if (!year) {
            year = this.defaultYear;;
        }
        let sessionList = (<Observable<Session[]>>this.db.list('devfest' + year + '/schedule', { query: { orderByChild: 'title' } }));
        sessionList.subscribe(next => {
            localStorage.setItem('sessionsCache' + year, JSON.stringify(next));
        });

        return sessionList
            .startWith(JSON.parse(localStorage.getItem('sessionsCache' + year)))
            .filter(x => !!x)
            .shareResults();
    }

    getSpeakers(year?: string): Observable<Speaker[]> {
        if (!year) {
            year = this.defaultYear;;
        }
        const ref = 'devfest' + year + '/speakers';

        let speakers = this.db.list(ref, { query: { orderByChild: 'name' } });
        speakers.subscribe(next => {
            localStorage.setItem('speakerCache' + year, JSON.stringify(next));
        })
        let speakerCache = localStorage.getItem('speakerCache' + year);
        return speakers
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
