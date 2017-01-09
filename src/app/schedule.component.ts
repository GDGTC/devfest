import { Component } from '@angular/core';


import { DataService } from './shared/data.service';


@Component({
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent {

    timeSlots;

    thisSession = {};

    showDialog = false;


    constructor(public ds: DataService ) {
        this.timeSlots = ds.timeSlots;
    }

    updateTrack(trackName) {

    }
}
