import { Component } from '@angular/core';

import { AuthService } from '../shared/auth.service';
import { DataService, Session } from '../shared/data.service';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/combineLatest";

@Component({
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent {

    allSessions: Observable<any>;
    myAgenda: Observable<any>;

    dialogSession: Session = null;
    filteredSlots: Observable<any>;


    constructor(public ds: DataService, public auth: AuthService) {
        this.filteredSlots = this.allSessions = ds.timeSlots;
        this.myAgenda = this.allSessions.combineLatest(this.auth.agenda, (sessions, agenda) => {
            let resultSessions = {};
            let keys = [];
            
            for(let session of agenda) {
                keys.push(session.$key);
            }
            for(let timeSlot of Object.keys(sessions.sessions)) {
                resultSessions[timeSlot] = [];
                for(let i = sessions.sessions[timeSlot].length-1;i>=0;i--) {
                    let session = sessions.sessions[timeSlot][i];

                    if(keys.indexOf(session.$key) === -1 ) {
                        // removing from agenda because it wasn't found in my agenda
                        //sessions.sessions[timeSlot].splice(i,1);
                    } else {
                        // keeping in agenda because it was found in my agenda 
                        resultSessions[timeSlot].push(session);
                    }
                }
            }
            return {sessions:resultSessions, slots: sessions.slots};

        });

    }

    updateTrack(trackName) {

    }
}
