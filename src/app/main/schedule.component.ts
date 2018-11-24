import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService, Session } from '../shared/data.service';

import { Observable ,  combineLatest } from 'rxjs';
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
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent {
    // Two versions of the same data, one filtered, one not
    allSessions: Observable<Schedule>;
    populatedAgenda: Observable<any>;

    // Where we store the reference to the currently selected data.
    filteredData: Observable<any>;

    constructor(
        public ds: DataService,
        public auth: AuthService,
        public route: ActivatedRoute,
        public yearService: YearService
    ) {
        this.filteredData = this.allSessions;

        /**
         * Session data should look like data[time][room] = session;
         */
        this.allSessions = ds.getSchedule(yearService.year).pipe(
            map(list => {
                let data = {};
                for (let session of list) {
                    let time = session.startTime;
                    if (typeof data[time] !== 'object') {
                        data[time] = {};
                    }

                    // Get height of box
                    if (!session.blocks) {
                        session.blocks = 1;
                    }
                    if (session.track !== 'all' && session.track !== 'Keynote') {
                        data[time][session.room] = session;
                    } else {
                        data[time]['all'] = session;
                    }
                }

                let pad = n => (n < 10 ? '0' + n : n);
                // Look for holes
                for (let time in data) {
                    if (data.hasOwnProperty(time)) {
                        let slot = data[time];
                        // Holes can only exist if there isn't an "all" session
                        if (!slot.all) {
                            for (let room of ds.getVenueLayout().rooms) {
                                if (!slot[room]) {
                                    // Found a hole in this room, checking previous time slot
                                    let previous =
                                        time.substr(0, 11) +
                                        pad(parseInt(time.substr(11, 2), 10) - 1) +
                                        time.substr(13);
                                    // Placeholder if there's nothing in the previous time slot, or there is and it's a short one

                                    if (!data[previous]) {
                                        console.log( 'Looking for data at ID:', previous, ' in ', data);

                                        console.error(
                                            `Hit an invalid schedule entry!` +
                                                `We probably couldn't calculate something probably related to an invalid time.`);
                                        continue;
                                    }

                                    if (!data[previous][room]) {
                                        data[time][room] = 'placeholder';
                                    } else if (!data[previous][room].blocks || data[previous][room].blocks < 2) {
                                        // This room has nothing in it!
                                        data[time][room] = 'placeholder';
                                    } else {
                                    }
                                }
                            }
                        }
                    }
                }

                let startTimes = Object.keys(data).sort();
                return { startTimes: startTimes, gridData: data, rooms: ds.getVenueLayout().rooms };
            }),
            shareReplay(1)
        );

        this.filteredData = this.allSessions;

        // Intersect the user's agenda against the session list
        this.populatedAgenda = combineLatest(this.allSessions, this.auth.agenda).pipe(
            map(([allData, rawAgenda]) => {
                return this.filterToMyAgenda(allData, rawAgenda);
            })
        );
    }

    /**
     * Take in a full schedule and a set of agenda keys, return a new schedule of just those sessions the user has selected.
     */
    filterToMyAgenda(allData: Schedule, rawAgenda: any[]): Schedule {
        let result: Schedule = { startTimes: allData.startTimes, gridData: {}, rooms: [] };

        let resultSessions = {};
        let allSessions = allData.gridData;
        let rooms = [];
        let myAgendaKeys = [];

        for (let session of rawAgenda) {
            myAgendaKeys.push(session.$key);
        }

        for (let time in allSessions) {
            if (allSessions.hasOwnProperty(time)) {
                resultSessions[time] = {};

                let slot = allSessions[time];
                if (!slot.all) {
                    for (let room in slot) {
                        if (slot.hasOwnProperty(room)) {
                            let session = slot[room];
                            if (myAgendaKeys.indexOf(session.$key) !== -1) {
                                // Track which rooms we actually need.
                                if (!(room in rooms)) {
                                    rooms.push(room);
                                }
                                resultSessions[time][room] = session;
                            }
                        }
                    }
                } else {
                    // Ignore user preferences for "all" sessions
                    resultSessions[time].all = slot.all;
                }
            }
        }

        // We do this to maintain the original order of the rooms
        let returnRooms = [];
        for (let room of this.ds.getVenueLayout().rooms) {
            if (rooms.indexOf(room) !== -1) {
                returnRooms.push(room);
            }
        }
        result.gridData = resultSessions;
        result.rooms = returnRooms;
        return result;
    }
}
