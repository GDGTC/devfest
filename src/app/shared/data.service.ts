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
    sessionList: Observable<Session[]>;
    timeSlots;
    speakers: Observable<Speaker[]>;

    ROOMS = ['Large Auditorium', 'Small Auditorium', 'Lab', 'Classroom A', 'Classroom B', 'Classroom C', 'Classroom D'];
    FLOORS = {'Large Auditorium': 1, 'Small Auditorium': 1, 'Lab': 3, 'Classroom A': 3, 'Classroom B': 3, 'Classroom C': 3, 'Classroom D': 3};

    FIREPATH = 'devfest2017';
    


    constructor(public af: AngularFire) {
        this.sessionList = (<Observable<Session[]>>af.database.list(this.FIREPATH + '/schedule', { query: { orderByChild: 'title' } }));
        this.sessionList.subscribe(next => {
            localStorage.setItem("sessionsCache", JSON.stringify(next));
        });

        this.sessionList = this.sessionList
            .startWith(JSON.parse(localStorage.getItem('sessionsCache')))
            .filter(x => !!x)
            .shareResults();

        this.speakers = af.database.list(this.FIREPATH + '/speakers', { query: { orderByChild: 'name'} });
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