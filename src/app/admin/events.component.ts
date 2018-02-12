import { Component } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../shared/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Event {
    id?: string;
    name: string;
    url: string;
    date: string;

    showCFP?: boolean;
    showTickets?: boolean;
    showSchedule?: boolean;
    showSpeakers?: boolean;
}

@Component({
    templateUrl: 'events.component.html',
})
export class EventsComponent {
    events: Observable<Event[]>;

    constructor( public auth: AuthService, public afs: AngularFirestore) {
        let collection = afs.collection<Event>('events');
        this.events = collection.valueChanges();

        this.events.subscribe(eventList => console.log('Event list is', eventList));
    }
}
