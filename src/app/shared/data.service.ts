import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

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
    $key?: string;
    name?: string;
    bio?: string;
    confirmed?: boolean;
    company?: string;
    twitter?: string;
    imageUrl?: string;
    website?: string;
}

export interface Feedback {

}


@Injectable()
export class DataService {
    ROOMS = ['Large Auditorium', 'Small Auditorium', 'Lab', 'Classroom A', 'Classroom B', 'Classroom C', 'Classroom D'];
    FLOORS = { 'Large Auditorium': 1, 'Small Auditorium': 1, 'Lab': 3, 'Classroom A': 3, 'Classroom B': 3, 'Classroom C': 3, 'Classroom D': 3 };

    constructor(public db: AngularFireDatabase) { }

    getSchedule(year?: string): Observable<Session[]> {
        if (!year) {
            year = environment.defaultYear;
        }
        let sessionList = <FirebaseListObservable<Session[]>>this.listPath(year, 'schedule', { query: { orderByChild: 'title' } });
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
            year = environment.defaultYear;
        }
        let speakers = this.listPath(year, 'speakers', { query: { orderByChild: 'name' } });

        speakers.subscribe(next => {
            localStorage.setItem('speakerCache' + year, JSON.stringify(next));
        })
        let speakerCache = localStorage.getItem('speakerCache' + year);
        return speakers
            .startWith(JSON.parse(speakerCache))
            .filter(x => !!x)
            .shareResults();
    }

    getFeedback(year?: string): Observable<Feedback[]> {
        if (!year) {
            year = environment.defaultYear;
        }

        return this.listPath(year, 'feedback');
    }
    getVolunteers(year?: string) {
        if (!year) {
            year = environment.defaultYear;
        }
        return this.db.object(`devfest${year}/volunteers`);
    }

    getAgenda(year, uid, session): FirebaseObjectObservable<any> {
        const path = `devfest${year}/agendas/${uid}/${session}/`;
        return this.db.object(path);
    }

    /**
     * Takes in an ISO 8601 datetime string
     * returns a friendly time e.g. "8 PM" in Minnesota Time
     */
    customDateFormatter(isoDateTime) {
        let dateTime = new Date(isoDateTime);
        let time = dateTime.getHours();
        time -= (6 - dateTime.getTimezoneOffset() / 60)
        let indicator = (time >= 12 && time < 24) ? 'PM' : 'AM';
        if (time > 12) {
            time -= 12;
        }
        return `${time} ${indicator}`;
    }

    save(year: string, path: 'schedule' | 'speakers', item) {
        let list = this.listPath(year, path);
        if (item.$key) {
            return list.update(item.$key, item);
        } else {
            return list.push(item);
        }
    }
    delete(year: string, path: 'schedule' | 'speakers', item) {
        let list = this.listPath(year, path);
        list.remove(item.$key);

    }

    listPath(year: string | number, type: 'schedule' | 'speakers' | 'feedback' | 'volunteers', query?) {
        return this.db.list(`devfest${year}/${type}`, query);
    }
}
