import { Injectable } from '@angular/core';
import {
    AngularFireDatabase,
    FirebaseListObservable,
    FirebaseObjectObservable,
} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';

import './shareResults';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import { YearService } from 'app/year.service';
import { SafeHtml } from '@angular/platform-browser';

export interface Session {
    $key?: string;
    room?: string;
    startTime?: string;
    title?: string;
    description?: string;
    track?: string;
    speakers?: any[];
    blocks?: number;
    renderedDescription?: SafeHtml;
    notes?: string;
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

export interface Feedback {}

@Injectable()
export class DataService {
    constructor(public db: AngularFireDatabase, public yearService: YearService) {}

    // @TODO this method is called much too often
    getVenueLayout() {
        let rooms, floors;

        if (this.yearService.year < 2018) {
            rooms = [
                'Large Auditorium',
                'Small Auditorium',
                'Lab',
                'Classroom A',
                'Classroom B',
                'Classroom C',
                'Classroom D',
            ];
            floors = {
                'Large Auditorium': 1,
                'Small Auditorium': 1,
                Lab: 3,
                'Classroom A': 3,
                'Classroom B': 3,
                'Classroom C': 3,
                'Classroom D': 3,
            };
        } else {
            rooms = ['Large Auditorium', 'Small Auditorium', '235', '238', '244', '321', '334', '446', '458'];
            floors = {
                'Large Auditorium': 'Schultze',
                'Small Auditorium': 'Schultze',
                '235': 'Law',
                '238': 'Law',
                '244': 'Law',
                '321': 'Law',
                '334': 'Law',
                '446': 'Law',
                '458': 'Law',
            };
        }
        return { floors: floors, rooms: rooms };
    }

    getSchedule(): Observable<Session[]> {
        let sessionList = <FirebaseListObservable<Session[]>>this.listPath('schedule', {
            query: { orderByChild: 'title' },
        });
        sessionList.subscribe(next => {
            localStorage.setItem('sessionsCache' + this.yearService.year, JSON.stringify(next));
        });

        return sessionList
            .startWith(JSON.parse(localStorage.getItem('sessionsCache' + this.yearService.year)))
            .filter(x => !!x)
            .shareResults();
    }

    getSpeakers(): Observable<Speaker[]> {
        let speakers = this.listPath('speakers', { query: { orderByChild: 'name' } });

        speakers.subscribe(next => {
            localStorage.setItem('speakerCache' + this.yearService.year, JSON.stringify(next));
        });
        let speakerCache = localStorage.getItem('speakerCache' + this.yearService.year);
        return speakers
            .startWith(JSON.parse(speakerCache))
            .filter(x => !!x)
            .shareResults();
    }

    getFeedback(): Observable<Feedback[]> {
        return this.listPath('feedback');
    }
    getVolunteers() {
        return this.db.object(`devfest${this.yearService.year}/volunteers`);
    }

    getAgenda(uid, session): FirebaseObjectObservable<any> {
        const path = `devfest${this.yearService.year}/agendas/${uid}/${session}/`;
        return this.db.object(path);
    }

    /**
     * Takes in an ISO 8601 datetime string
     * returns a friendly time e.g. "8 PM" in Minnesota Time
     */
    customDateFormatter(isoDateTime) {
        let dateTime = new Date(isoDateTime);
        let time = dateTime.getHours();
        time -= 6 - dateTime.getTimezoneOffset() / 60;
        let indicator = time >= 12 && time < 24 ? 'PM' : 'AM';
        if (time > 12) {
            time -= 12;
        }
        return `${time} ${indicator}`;
    }

    save(path: 'schedule' | 'speakers', item) {
        console.log('Attempting to save', path, item);
        let list = this.listPath(path);
        if (item.$key) {
            return list.update(item.$key, item);
        } else {
            return list.push(item);
        }
    }

    delete(path: 'schedule' | 'speakers', item) {
        console.log('Attempting to delete', item, 'of type', path);
        let list = this.listPath(path);
        list.remove(item.$key);
    }

    deleteSpeakerFromSession(session: Session, speakerKey: string) {
        const list = this.db.list(`devfest${this.yearService.year}/schedule/${session.$key}/speakers`);
        list.remove(speakerKey)
        .then(() => {
            console.log(`Speaker (${speakerKey} deleted from session (${session.$key}) .`);
        })
        .catch(err => {
            console.error('Error deleting speaker from session', err);
        })
    }

    listPath(type: 'schedule' | 'speakers' | 'feedback' | 'volunteers', query?) {
        return this.db.list(`devfest${this.yearService.year}/${type}`, query);
    }
}
